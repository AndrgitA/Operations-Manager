/**
 * Initialize User by token before init App
 * @param { AxiosStatic } http interface for http request
 * @param { String } token token identification
 * @param { Function } callbackFunction callback function. Called after request to back.
 */
const initUser = function(http, token, callbackFunction) {
    http.get('/login', { headers: { Token: token } }).then(response => {
        console.log('[initMain.js]: initUser(response): ', response);
        let data = response.data;
        let tmp = {
            login: data.login,
            role: data.role,
            id: data.id
        };
        callbackFunction(tmp);
    }).catch(error => {
        console.log("initMain.js]: initUser(error): ", error);
        callbackFunction(null);
    });
}

export {
    initUser
}
