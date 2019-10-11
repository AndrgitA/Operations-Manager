// import words from '@/assets/languages/ru.json';

// const templateWords = words.messages.$common.template_words;
// const NOT_I18n = Object.keys(templateWords).reduce((obj, key) => {
//     obj[`$common.template_words.${ key }`] = templateWords[key];
//     return obj;
// }, {});

// const localInterfaceWords = {
//     '$t': str => (NOT_I18n[str] || str)
// };

// /**
//  * Select name by number from array
//  * @param { Number } value 
//  * @param { Array } array const array[3] = [ name, names, names_s ], else '';
//  * @returns { String }
//  */
// const nameSelection = function(value, array) {

//     let curValue = Math.abs(value);

//     if (array.length === 3) {
//         let str = array[1];                                 // names
//         if (curValue < 5 || curValue > 20) {
//             let lastNumber = curValue % 10;
//             if (lastNumber === 1) {
//                 str = array[0];                                 // name
//             } else if (lastNumber > 1 && lastNumber < 5) {
//                 str = array[2]                                  // names_s
//             }
//         }
//         return str;
//     }
//     return '';
// }

// /**
//  * return interface for select words
//  * @param { Object } f returned if !!f
//  * @param { Object } d return default if !f 
//  */
// const getInterfaceWords = function(f, d) {
//     return (f === null || f === undefined) ? d : f;
// }

// /**
//  * return Array words
//  * @param { String } type 
//  * @param { Object } interfaceWords
//  * @returns { Any } return Array[3] or Null object. if type not found;
//  */
// const getWordsFromInterface = function(type, interfaceWords) {
//     let types = {
//         'ALBUM': [ interfaceWords.$t("$common.template_words.album"), interfaceWords.$t("$common.template_words.albums"), interfaceWords.$t("$common.template_words.albums_s") ],
//         "HOUR": [ interfaceWords.$t("$common.template_words.hour"), interfaceWords.$t("$common.template_words.hours"), interfaceWords.$t("$common.template_words.hours_s") ],
//         'MAKEUP_ARTIST': [ interfaceWords.$t("$common.template_words.makeup_artist"), interfaceWords.$t("$common.template_words.makeup_artists"), interfaceWords.$t("$common.template_words.makeup_artists_s") ],
//         'PHOTOGRAPHER': [ interfaceWords.$t("$common.template_words.photographer"), interfaceWords.$t("$common.template_words.photographers"), interfaceWords.$t("$common.template_words.photographers_s") ],
//         'SLIDE': [ interfaceWords.$t("$common.template_words.slide"), interfaceWords.$t("$common.template_words.slides"), interfaceWords.$t("$common.template_words.slides_s") ],
//         'USER': [ interfaceWords.$t("$common.template_words.user"), interfaceWords.$t("$common.template_words.users"), interfaceWords.$t("$common.template_words.users_s") ],
//     }
//     return types[type] || null;
// }
// /**
//  * @param { Number } type type of Template
//  * @param { Object } interfaceWords Interface for return words by key
//  * @param { Boolean } notNegativeFlag not negative number or any number
//  * @param { Boolean } onlyWordFlag return template `{number} word`, or only `word`
//  */
// Number.prototype.toTemplate = function(type, interfaceWords = null, notNegativeFlag = true, onlyWordFlag = false) {
//     // console.log("[template.js]: toTemplate: ", type, interfaceWords, notNegativeFlag, onlyWordFlag);
//     if (!isNaN(this) &&
//         Object.prototype.toString.call(type) === '[object String]' &&
//         type.length > 0) {

//         if (!notNegativeFlag && this < 0) {
//             return '';
//         }
//         let app = getInterfaceWords(interfaceWords, localInterfaceWords);
//         let arrayWords = getWordsFromInterface(type, app);
//         if (arrayWords === null) {
//             return '';
//         }
//         let returnValue = nameSelection(this, arrayWords);
//         if (onlyWordFlag) {
//             return returnValue;
//         }
//         return `${ this } ${ returnValue }`;
//     }
//     return '';
// }
// String.prototype.toPhoneFormat = function() {
//     // console.log('[templates.js]: toPhoneFormat: ', this);
//     if (this.length === 11) {
//         return `+${ this.charAt(0) } ${ this.substr(1, 3) } ${ this.substr(4, 3) } ${ this.substr(7) }`
//     }
//     return '';
// }
// // Number.prototype.toVolunteerTemplate = function(f) {
// //     console.log("[templates.js]: toVolunteerTemplte: ","target: ", this, " function: ", f);
// //     if (!isNaN(this)) {
// //         let app = (f === null || f === undefined) ? curTemplates : f;

// //         let str = app.$t('$common.template_words.volunteers');       // волонтера
// //         if (this === 1) {
// //             str = app.$t('$common.template_words.volunteer');        // волонтер
// //         } else if (this > 1 && this < 5) {
// //             str = app.$t('$common.template_words.volunteers_s');     // волонтеров
// //         }
// //         return `${ this } ${ str.toLowerCase() }`;
// //     }
// //     return '';
// // }

// // Number.prototype.toYearsTemplate = function(f) {
// //     console.log("[templates.js]: toYearsTemplate: ", this, f);
// //     if (!isNaN(this) || this >= 0) {
// //         let app = (f === null || f === undefined) ? curTemplates : f;
// //         let str = app.$t('$common.template_words.years');    // лет
// //         if (this < 5 || this > 20) {                // лет 5-20
// //             let lastNumber = this % 10;
// //             if (lastNumber === 1) {
// //                 str = app.$t('$common.template_words.year');     // год
// //             } else if (lastNumber > 1 && lastNumber < 5) {
// //                 str = app.$t('$common.template_words.year_s');    // года
// //             }
// //         }
// //         return `${ this } ${ str.toLowerCase() }`;
// //     }
// //     return '';
// // }
// // String.prototype.toPhoneFormat = function() {
// //     console.log('[templates.js]: toPhoneFormat: ', this);
// //     if (this.length === 11) {
// //         return `+${ this.charAt(0) } ${ this.substr(1, 3) } ${ this.substr(4, 3) } ${ this.substr(7) }`
// //     }
// //     return '';
// // }

// // Boolean.prototype.toConfirmTemplate = function(f) {
// //     console.log('[templates.js]: toConfirmTemplate', this, f);
// //     let app = (f === null || f === undefined) ? curTemplates : f;
// //     return this ? app.$t('$fields.participation_confirmed').toLowerCase() : app.$t('$fields.not_participate').toLowerCase();
// // }

// // Number.prototype.toPointTemplate = function(f) {
// //     console.log('[templates.js]: toPointTemplate: ', this, f);
// //     if (!isNaN(this) || this >= 0) {
// //         let app = (f === null || f === undefined) ? curTemplates : f;
// //         let str = app.$t('$common.template_words.points');    // баллов
// //         if (this < 5 || this > 20) {                 // баллов 5-20
// //             let lastNumber = this % 10;            
// //             if (lastNumber === 1) {
// //                 str = app.$t('$common.template_words.point');     // балл
// //             } else if (lastNumber > 1 && lastNumber < 5) {
// //                 str = app.$t('$common.template_words.points_s');    // балла
// //             }
// //         }
// //         return `${ this } ${ str.toLowerCase() }`;
// //     }
// //     return '';
// // }

// // Number.prototype.toApplicationTemplate = function(f) {
// //     console.log('[templates.js]: toApplicationTemplate: ', this, f);
// //     if (!isNaN(this) || this >= 0) {
// //         let app = (f === null || f === undefined) ? curTemplates : f;
// //         let str = app.$t('$common.template_words.applications');    // заявок
// //         if (this < 5 || this > 20) {                 // заявок 5-20
// //             let lastNumber = this % 10;            
// //             if (lastNumber === 1) {
// //                 str = app.$t('$common.template_words.application');     // заявка
// //             } else if (lastNumber > 1 && lastNumber < 5) {
// //                 str = app.$t('$common.template_words.applications_s');    // заявки
// //             }
// //         }
// //         return `${ this } ${ str.toLowerCase() }`;
// //     }
// //     return '';
// // }