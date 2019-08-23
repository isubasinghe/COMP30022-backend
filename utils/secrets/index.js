"use strict"
let cache = [];


const getValue = (key) => {
    let value = cache[key];
    if (value === undefined) {
        if(process.env[key]) {
            return process.env[key];
        }else {
            throw new Error("Environment variable does not exist");
        }
    }
    return value;
}   
module.exports = getValue;