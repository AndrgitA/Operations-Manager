// #region clone functional

/**
 * Will return the cloned Array
 * @param { Array } array 
 */
const cloneArray = function(array) {
    let cloneElement = [];
    array.forEach(iter => {
        cloneElement.push(getClone(iter));
    });
    return cloneElement;
};

/**
 * Will return the cloned Object
 * @param { Object } obj 
 */
const cloneObject = function(obj) {
    let cloneElement = Object.create(Object.getPrototypeOf(obj));
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            cloneElement[prop] = getClone(obj[prop]);
        }
    }
    return cloneElement;
};

/**
 * Will return the cloned Function
 * @param { Function } f 
 */
const cloneFunction = function(f) {
    // let that = f;
    // let cloneElement = function() { return that.apply(this, arguments); }; // TODO: Function.prototype.apply need learn more
    
    let cloneElement;
    eval('cloneElement=' + f.toString());
    
    // let cloneElement = new Function('return ' + f.toString())();
    for (let key in f) {
        if (f.hasOwnProperty(key)) {
            cloneElement[key] = f[key];
        }
    }
    return cloneElement;
};

/**
 * Will return the cloned Date
 * @param { Date } d 
 */
const cloneDate = function(d) {
    let cloneElement = new Date(d);
    return cloneElement;
};

// #region const variables types
const addedTypes = {};

/**
 * primitive types for equal value only
 */
const primitiveTypes = [
    '[object Undefined]',
    '[object Null]',
    '[object Boolean]',
    '[object Symbol]',
    '[object String]',
    '[object Number]',
    '[object BigInt]'
];

/**
 * complex types to get the value using a function of a specific type
 */
const complexTypes = {
    '[object Array]': cloneArray,
    '[object Object]': cloneObject,
    '[object Function]': cloneFunction,
    '[object Date]': cloneDate
};
const complexTypes_ = Object.keys(complexTypes);
// #endregion


/**
 * Method for cloning certain types
 * @param { any } value object for cloning
 */
const getClone = function(value) {
    const addedTypes_ = Object.keys(addedTypes);
    const type = Object.prototype.toString.call(value);

    if (primitiveTypes.indexOf(type) !== -1) {              // primitiveTypes
        return value;
    } else if (complexTypes_.indexOf(type) !== -1) {         // complexTypes
        return complexTypes[type](value);
    } else if (addedTypes_.indexOf(type) !== -1) {          // addedType
        return addedTypes[type](value);
    } else {                                                // undefined type
        throw new Error('Unknown type, please add its implementation to the getClone function using the addNewType method')
    }
    // return JSON.parse(JSON.stringify(value));
};

/**
 * function for adding a type and cloning it into a common getClone method.
 * You can use the getClone method in your implementation to get deep cloning.
 * @param { String } type Use Object.prototype.toString.call(type) 
 * @param { Function } f Type cloning function
 * @param { Boolean } reWrite Default value false. Option to override method for addedType
 * @returns { void }
 */
const addNewType = function(type, f, reWrite = false) {
    if (Object.prototype.toString.call(f) === '[object Function]' && 
        Object.prototype.toString.call(type) === '[object String]') {
        if (!addedTypes.hasOwnProperty(type) || (addedTypes.hasOwnProperty(type) && reWrite)) {
            addedTypes[type] = f;
            console.log(`[panelCloning.js]: addNewType: Success add new type "${ type }"`);
        } else {
            console.warn("This type has already been added to the cloning method. If you want to overwrite, you must specify the reWrite as true")
        }
    } else {    
        console.error("Type error, check input")
    }
}
// #endregion 

export {
    getClone,
    addNewType
}

export default {
    getClone,
    addNewType
}