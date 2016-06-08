const fs = require('fs');

let validator = {
    init: function(errorHandler) {
        errorHandler && this.isFunction(errorHandler);
        this.fail = errorHandler || this.fail;
    },

    fail: function(msg) {
        throw new Error(msg);
    },

    isFunction: function(param) {
        return typeof param === 'function' || this.fail(param + ' is not a function');
    },

    isSocketFile: function(path) {
        let result = path && fs.statSync(path).isSocket();
        return result || this.fail(path + ' file not exist or not socket');
    }
};

module.exports = Object.create(validator);
