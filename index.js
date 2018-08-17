const util = require('util');
const regexpUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
const regExpUrlStrict = /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
const dnsSocket = require('dns-socket')
const socket = dnsSocket()

let validate = function () {
    this.isArray = (array) => {
        return util.isArray(array);
    }

    this.isArrayEmpty = (array) => {
        return (util.isArray(array) & array.length > 0) ? true : false;
    }

    this.isArrayContainsOneObject = (array) => {
        return this.isArray(array) && array.some(a => typeof a == 'object');
    }

    this.isArrayContainsFullObject = (array) => {
        return this.isArray(array) && array.every(a => typeof a == 'object');
    }

    this.isArrayContainsOneString = (array) => {
        return this.isArray(array) && array.some(a => typeof a == 'string');
    }

    this.isArrayContainsFullString = (array) => {
        return this.isArray(array) && array.every(a => typeof a == 'string');
    }
    this.isArrayContainsFullNumber = (array) => {
        return this.isArray(array) && array.every(a => typeof a == 'number');
    }

    this.isArrayContainsOneNumber = (array) => {
        return this.isArray(array) && array.some(a => typeof a == 'number');
    }

    this.isBoolean = (boolean) => {
        return util.isBoolean(boolean)
    }

    this.isNumber = (number) => {
        return !isNaN(number);
    }
    this.isUrl = (url, strict) => {
        if (typeof url !== 'string') return false;
        else {
            return (strict) ? regExpUrlStrict.test(url) : regexpUrl.test(url);;
        }
        return false;
    }

    this.isObjectEmpty=(obj)=>{
        return !Object.keys(obj).length;
    }
    this.checkInternet = async () => {

            return new Promise((resolve, reject) => {
                socket.query({
                    questions: [{
                        type: 'A',
                        name: 'google.com'
                    }]
                }, 53, '8.8.8.8', (err, res) => {
                    if (err) reject(err);
                    else resolve(res)
                })
            })
    
    }

};

module.exports = new validate;