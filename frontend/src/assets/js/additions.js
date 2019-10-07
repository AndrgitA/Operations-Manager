// const sortObject = function(obj) {
//     let p = null;
//     return Object.keys(obj).sort().reduce(function (result, key) {
//         if (typeof obj[key] === 'object' && 
//             obj[key] !== null && 
//             !(Object.prototype.toString.call(obj[key]) === '[object Array]') && 
//             !(Object.prototype.toString.call(obj[key]) === '[object Date]')){
//             p = sortObject(obj[key]);
//         } else {
//             p = obj[key];
//         }
//         result[key] = p;
//         return result;
//     }, {});
// };

// export { sortObject };
