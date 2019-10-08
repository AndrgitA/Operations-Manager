import axios from 'axios';

// /api/v1/ // :TODO change later
axios.defaults.baseURL = `${ process.env.VUE_APP_SERVER_ADDRESS }/api/v${ process.env.VUE_APP_VERSION_API }`;

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, *';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(request => {
    if (request.params === null || typeof request.params !== 'object') {
        request.params = {};
    }
    return request;
});


/**
 * Initialize middleware for axios interface
 * @param { Vue } app ApplicationElement
 */
const initMiddleWare = function(app) {
    let store = app.$store,
        router = app.$router;
    store.commit('addInterceptorsAxios', {
        response: response => { return response; },
        error: error => {
            console.log(error);
            if (error.hasOwnProperty('response') && !!error.response && error.response.hasOwnProperty('status')) {
                if (error.response.status === 401) {                                        // not authorized
                    console.log("[middleWareAxios.js]: initMiddleWare(401): ", error);
                    store.commit('Logout', router);
                } else if (error.response.status === 402) {                                 // denied access action
                    console.log("[middleWareAxios.js]: initMiddleWare(402): ", error);
                } else {                                                                    // other error
                    console.log("[middleWareAxios.js]: initMiddleWare(other): ", error);
                }
            }
            return Promise.reject(error);
        }
    });
};

export {
    axios,
    initMiddleWare
}


export default axios;