"use strict";
/* eslint-disable max-len */
/*
* @param firstnumber aaaa
* @param secondnumber aaaaaa
* @return bbbbbb
* ```typescript
*     add(1,7) = 8
*```
*/
exports.__esModule = true;
exports.division = exports.multiplicacion = exports.resta = exports.add = void 0;
function add(firstnumber, secondnumber) {
    return firstnumber + secondnumber;
}
exports.add = add;
console.log("add(1,7): ".concat(add(1, 7)));
function resta(firstnumber, secondnumber) {
    return firstnumber - secondnumber;
}
exports.resta = resta;
console.log("resta(1,7): ".concat(resta(1, 7)));
function multiplicacion(firstnumber, secondnumber) {
    return firstnumber * secondnumber;
}
exports.multiplicacion = multiplicacion;
console.log("multiplicacion(1,7): ".concat(multiplicacion(1, 7)));
function division(firstnumber, secondnumber) {
    return firstnumber / secondnumber;
}
exports.division = division;
console.log("division(1,7): ".concat(division(1, 7)));
