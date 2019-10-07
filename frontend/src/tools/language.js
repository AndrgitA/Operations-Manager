import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import en from '@/assets/languages/en.json';
import ru from '@/assets/languages/ru.json';

let locale = 'ru';
Vue.use(VueI18n);

const vueI18n = new VueI18n({
    locale: locale,
    messages: {
        // 'en': en['messages'],
        'ru': ru['messages']
    }
})

export default vueI18n;