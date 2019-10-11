import { getClone, addNewType } from './panelCloning.js';
import { isEqual, isEqualOf, addNewEqualType } from './panelEquals.js';


const panel = {
    get clone() { return getClone },
    get newCloneType() { return addNewType },
    get isEqual() { return isEqual },
    get isEqualOf() { return isEqualOf },
    get newEqualType() { return addNewEqualType }
};

const install = function(Vue, options) {
    console.log('[panel.js]: install');
    // Vue.getClone = getCLone;
    if (Vue.prototype.$panel === undefined) {
        console.log('[panel.js]: initPlugin(panel)');
        
        Object.defineProperty(Vue.prototype, '$panel', {
            value: panel,
            writable: false,
            enumerable: true,
            configurable: true
        });
    }
};

export default {
    install
}