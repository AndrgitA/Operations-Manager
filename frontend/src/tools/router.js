import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import(/* webpackChunkName: "pageLogin" */ '@/views/Login.vue');

const Information = () => import(/* webpackChunkName: "pageInformation" */ '@/views/Information.vue');
const Processes = () => import(/* webpackChunkName: "pageProcesses" */ '@/views/Processes.vue');
const Scripts = () => import(/* webpackScripts: "pageScripts" */ '@/views/Scripts.vue');
Vue.use(Router);
const router = new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior (to, from, savedPosition) {
        if(savedPosition) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(savedPosition);
                }, 600)
            })
        } else {
            setTimeout(() => {
                return {x: 0, y: 0}
            }, 500);
        }
    },
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/information',
            name: 'Information',
            component: Information
        },
        {
            path: '/processes',
            name: 'Processes',
            component: Processes
        },
        {
            path: '/scripts',
            name: 'Scripts',
            component: Scripts
        },
        {
            path: '*',
            redirect: to => {
                const { hash, params, query } = to;
                return {
                    name: "Login",
                    params: {
                        to: { hash, params, query },
                        page_not_found: true
                    }
                }
            }
        }
    ]
});


/**
 * hook beforeEach for router;
 * @param { Store } store Vuex.Store
 */
const routerBeforeEach = function(store) {
    return (to, from, next) => {
        console.log("[router.js]: routerBeforeEach: ", to, from, store.state);
        switch (to.path) {
            case '/login':
                if (!!store.state.isAuth) {
                    let pathTo = '/processes'; // TODO: change later to /modules
                    next({ path: pathTo });
                } else {
                    next();
                }
                break;
            default: 
                if (!store.state.isAuth) {
                    next({ path: '/login' });
                } else {
                    next();
                }
        }
    };
};

export {
    router,
    routerBeforeEach
}

export default router;