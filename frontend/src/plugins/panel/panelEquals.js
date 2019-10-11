// #region equal functional

/**
 * Will return Array comparison
 * @param { Array } array1
 * @param { Array } array2 
 * @returns { Boolean }
 */
const equalArray = function(array1, array2) {
    let length = array1.length,
        length2 = array2.length;
    
    if (length !== length2) return false;
    for (let i = 0; i < length; i++) {
        if (!isEqual(array1[i], array2[i])) return false;
    }

    return true;
};

/**
 * Will return Object comparison
 * @param { Object } obj1
 * @param { Object } obj2 
 */
const equalObject = function(obj1, obj2) {
    let length = Object.keys(obj1).length,
        length2 = Object.keys(obj2).length;
    
    if (length !== length2) return false;
    for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
            if (!isEqual(obj1[key], obj2[key])) return false;
        } else {
            return false;
        }
    }

    return true;
};

/**
 * Will return Function comparison
 * @param { Function } f1
 * @param { Function } f2
 */
const equalFunction = function(f1, f2) {
    console.log(f1.toString(), f2.toString());
    return f1.toString() === f2.toString();
};

/**
 * Will return Date comparison
 * @param { Date } d1
 * @param { Date } d2 
 */
const equalDate = function(d1, d2) {
    return d1.getTime() === d2.getTime();
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
    '[object Array]': equalArray,
    '[object Object]': equalObject,
    '[object Function]': equalFunction,
    '[object Date]': equalDate
};
const complexTypes_ = Object.keys(complexTypes);
// #endregion

/**
 * Method for equal values from value2
 * @param { any } value1 any Type
 * @param { any } value2 if value type "Array", get once equals of array else return value1 === value2
 */
const isEqualOf = function(value1, value2) {
    let type = Object.prototype.toString.call(value2);
    if (type === '[object Array]') {        // isEqualOnce from array
        let length = value2.length;
        if (length > 0) {
            for (let i = 0; i < value1; i++) {
                if (isEqual(value1, valu2[i])) return true;
            }
        }
        return false;
    } 
    return isEqual(value1, value2);
    
}

/**
 * Method for equal values
 * @param { any } value1 element for equal with value2
 * @param { any } value2 element for equal with value1
 */
const isEqual = function(value1, value2) {
    // Get the values type
    const type = Object.prototype.toString.call(value1),
          type2 = Object.prototype.toString.call(value2);
    
    // If the two values are not the same type, return false
    if (type !== type2) return false;

    const addedTypes_ = Object.keys(addedTypes);            // array with addedTypes

    if (primitiveTypes.indexOf(type) !== -1) {              // primitiveTypes
        return value1 === value2;
    } else if (complexTypes_.indexOf(type) !== -1) {         // complexTypes
        return complexTypes[type](value1, value2);
    } else if (addedTypes_.indexOf(type) !== -1) {          // addedType
        return addedTypes[type](value1, value2);
    } else {                                                // undefined type
        throw new Error('Unknown type, please add its implementation to the isEqual function using the addNewEqualType method')
    }
};

/**
 * function for adding a type and cloning it into a common getClone method.
 * You can use the getClone method in your implementation to get deep cloning.
 * @param { String } type Use Object.prototype.toString.call(type) 
 * @param { Function } f Type cloning function
 * @param { Boolean } reWrite Default value false. Option to override method for addedType
 * @returns { void }
 */
const addNewEqualType = function(type, f, reWrite = false) {
    if (Object.prototype.toString.call(f) === '[object Function]' && 
        Object.prototype.toString.call(type) === '[object String]') {
        if (!addedTypes.hasOwnProperty(type) || (addedTypes.hasOwnProperty(type) && reWrite)) {
            addedTypes[type] = f;
            console.log(`[panelEquals.js]: addNewEqualType: Success add new type "${ type }"`);
        } else {
            console.warn("This type has already been added to the cloning method. If you want to overwrite, you must specify the reWrite as true")
        }
    } else {    
        console.error("Type error, check input")
    }
}
// #endregion 

export {
    isEqual,
    isEqualOf,
    addNewEqualType
}

export default {
    isEqual,
    isEqualOf,
    addNewEqualType
}




// /**
//  * Function is equals object from types (Array, Object, Function, Number, String, Boolean), any object types equals as value1 === value2;
//  * @param {*} value1 First object for equal
//  * @param {*} value2 Second object for equal
//  */
// const isEqual = function(value1, value2) {
    
//     // Get the value type
//     let type = Object.prototype.toString.call(value1);
//     let type_2 = Object.prototype.toString.call(value2);

//     // If the two values are not the same type, return false
//     if (type !== type_2) return false;

//     let objectTypes = [ 
//         '[object Array]',
//         '[object Object]'
//     ];

//     // let primitiveTypes = [
//     //     '[object Boolean]',
//     //     '[object Number]',
//     //     '[object String]'
//     // ];
//     // // If items are not an object or array return false;
//     // if (objectTypes.indexOf(type) < 0 && primitiveTypes.indexOf(type) < 0) return false;

//     // // If items are primitive types return === value;
//     // if (primitiveTypes.indexOf(type) !== -1) return value1 === value_;
    
//     // If items is functions
//     if (type === '[object Function]') return value1.toString() === value2.toString();
    
//     // If items are not an object or array return === equals;
//     if (objectTypes.indexOf(type) < 0) return value1 === value2;

//     // Compare the length of the length of the two items
//     let value1Len = type === '[object Array]' ? value1.length : Object.keys(value1).length;
//     let value2Len = type === '[object Array]' ? value2.length : Object.keys(value2).length;
    
//     if (value1Len !== value2Len) return false;

//     // Compare properties
//     if (type === '[object Array]') {
//         for (let i = 0; i < value1Len; i++) {
//             if (!isEqual(value1[i], value2[i])) return false;
//         } 
//     } else {
//         for (let key in value1) {
//             if (value2.hasOwnProperty(key)) {
//                 if (!isEqual(value1[key], value2[key])) return false;
//             } else {
//                 return false;
//             }
//         }
//     }

//     // if nothing failed, return true
//     return true;
// };

// export default isEqual;