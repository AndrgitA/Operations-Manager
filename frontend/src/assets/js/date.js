const NOT_I18n = {
    "$date.ago": "Назад",
    "$date.day": "День",
    "$date.days": "Дней",
    "$date.h": "ч",
    "$date.m": "м",
    "$date.never": "Никогда",
    "$date.today": "Сегодня",
    "$date.s": "с",
    "$month.apr": "Апр",
    "$month.aug": "Авг",
    "$month.dec": "Дек",
    "$month.feb": "Фев",
    "$month.jan": "Янв",
    "$month.jul": "Июль",
    "$month.jun": "Июнь",
    "$month.mar": "Мар",
    "$month.nov": "Ноя",
    "$month.oct": "Окт",
    "$month.sep": "Сен",
    "$month.april": "Апреля",
    "$month.august": "Августа",
    "$month.december": "Декабря",
    "$month.february": "Февраля",
    "$month.january": "Января",
    "$month.july": "Июля",
    "$month.june": "Июня",
    "$month.march": "Марта",
    "$month.may": "Мая",
    "$month.november": "Ноября",
    "$month.october": "Октября",
    "$month.september": "Сентября",
    "$month.april_n": "Апрель",
    "$month.august_n": "Август",
    "$month.december_n": "Декабрь",
    "$month.february_n": "Февраль",
    "$month.january_n": "Январь",
    "$month.july_n": "Июль",
    "$month.june_n": "Июнь",
    "$month.march_n": "Март",
    "$month.may_n": "Май",
    "$month.november_n": "Ноябрь",
    "$month.october_n": "Октябрь",
    "$month.september_n": "Сентябрь", 
};

const cur_Struct = {
    '$t': str => (NOT_I18n[str] || str)
};


Date.prototype.getMyFormat = function() {
    let MM = this.getMonth() + 1;
    let DD = this.getDate();
    let YY = this.getFullYear();
    let mm = this.getMinutes();
    let hh = this.getHours();

    return [
        (DD > 9 ? '' : '0') + DD + '.',
        (MM > 9 ? '' : '0') + MM + '.',
        YY + '_',
        (hh > 9 ? '' : '0') + hh + ':',
        (mm > 9 ? '' : '0') + mm
    ].join('');
};

// // String.prototype.timeDifference = function(f = null) {
// //     let app = f === null || f === undefined ? cur_Struct : f;
// //     let tmp_date1 = new Date(this.replace(/(\d{2})\.(\d{2})\.(\d{4})\_(\d{2})\:(\d{2})/, "$3-$2-$1T$4:$5:00Z"));
// //     let tmp_date2 = Date.now();
// //     if (tmp_date1 instanceof Date && tmp_date1.toString() !== 'Invalid Date') {
// //         let res = tmp_date2 - tmp_date1;
// //         if (res < 0) {
// //             return app.$t('$date.never');
// //         } 
// //         res = Math.round(res / 864E5);
// //         if (res === 0) {
// //             return app.$t('$date.today');
// //         } else if (res === 1) {
// //             return `1 ${ app.$t('$date.day') } ${ app.$t('$date.ago') }`;
// //         }
// //         return `${res} ${ app.$t('$date.days') } ${ app.$t('$date.ago') }`;
// //     }
// //     return app.$t('$date.never');
// // }

String.prototype.toDateMyFormat = function(c, f) {
    let app = (f === null || f === undefined) ? cur_Struct : f;
    let tmp_date = new Date(`${ this }Z`);
    let month = [ 
        app.$t("$month.january"), app.$t("$month.february"), app.$t("$month.march"), app.$t("$month.april"),
        app.$t("$month.may"), app.$t("$month.june"), app.$t("$month.july"), app.$t("$month.august"),
        app.$t("$month.september"), app.$t("$month.october"), app.$t("$month.november"), app.$t("$month.december")
    ];

    if (Object.prototype.toString.call(tmp_date) === '[object Date]' && tmp_date.toString() !== 'Invalid Date'){
        switch(c){ 
            case 0: // lowerCase (DD month YYYY)
                return `${ tmp_date.getDate() } ${ month[tmp_date.getMonth()].toLowerCase() } ${ tmp_date.getFullYear() }`;
            case 1: // lowerCase (DD month YYYY HH:MM)
                return tmp_date.getDate() + ' ' + 
                       month[tmp_date.getMonth()].toLowerCase() + ' ' + 
                       tmp_date.getFullYear() + '  ' + 
                       (tmp_date.getHours() > 9 ? '' : '0') + tmp_date.getHours() + ':' + 
                       (tmp_date.getMinutes() > 9 ? '' : '0') + tmp_date.getMinutes();
            case 2: // lowerCase (DD month)
                return `${ tmp_date.getDate() } ${ month[tmp_date.getMonth()].toLowerCase() }`;
            default: 
                return tmp_date
        }
    } 
    // return app.$t('$date.never');
    return '';
};