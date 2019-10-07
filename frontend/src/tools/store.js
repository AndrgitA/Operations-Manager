import Vue from 'vue';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';
import axios from './axios.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        APP_SERVER_ADDRESS: process.env.VUE_APP_SERVER_ADDRESS,
        APP_VERSION_API: process.env.VUE_APP_VERSION_API,
        APP_IMAGE_URL_PREFIX: process.env.VUE_APP_IMAGE_URL_PREFIX,
        ObjectID: 0,
        flagUpdate: false,
        isAuth: false,
        modals: [],                                                 // container for modals
        notifications: [],                                          // container for notifications
        // TODO: update user struct for this project
        user: {
            given_name: '',
            family_name: '',
            email: ''
        },
        axios: axios
    },
    actions: {
        initializeUserData({ commit }, value) {
            let user = value.user,
                token = value.token;

            if (user !== null) {
                commit('setUserData', user);
                commit('Login', { token, router: null });
            } else {
                commit('Logout', null);
            }
        }
    },
    getters: {
        getObjectID(state) {
            return `app_id_${ state.ObjectID }`;
        }
    },
    mutations: {
        addInterceptorsAxios(state, { response, error }) {
            state.axios.interceptors.response.use(response, error);
        },
        updatePageData(state) {
            state.flagUpdate = !state.flagUpdate;
        },
        Login(state, { token, router }) {
            console.log("[store.js]: Login: ", token, router);
            state.isAuth = token;
            state.axios.defaults.headers.common['Token'] = token;
            
            console.log("[store.js]: Router: ", router);
            if (!!router) {
                router.replace({ path: '/photosessions' });
            }
        },
        Logout(state, router) {
            console.log("[store.js]: Logout: ", router);
            state.isAuth = false;
            delete state.axios.defaults.headers.common['Token'];
            VueCookie.delete('wase-panel__token')

            console.log("[store.js]: Router: ", router);
            if (!!router && router.history.current.path !== '/login') {
                router.replace({ path: '/login' });
            }
        },
        setUserData(state, user) {
            console.log("[store.js]: setUserData ", user);
            state.user = user;
        },
        incObjectID(state) {
            state.ObjectID++;
        },
        //#region modals area
        addModal(state, modalValue) {
            console.log("[store.js]: addModal: ", modalValue);
            state.modals.push(modalValue);
        },
        removeModal(state, index) {
            console.log("[store.js]: removeModal: ", index);
            state.modals.splice(index, 1);
        },
        removeAllModal(state) {
            console.log("[store.js]: removeAllModal: ");
            state.modals = [];
        },
        //#endregion

        //#region notification area
        addNotification(state, notificationValue) {
            console.log("[store.js]: addNotification: ", notificationValue);
            state.notifications.push(notificationValue);
        },
        removeFirstNotification(state) {
            if (state.notifications.length > 0) {
                state.notifications.splice(0, 1);
            }
        },
        removeAllNotification(state) {
            console.log("[store.js]: removeAllNotification: ");
            state.notifications = [];
        },
        //#endregion
    }
});


export default store;