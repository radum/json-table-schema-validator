'use strict';

var JsonTableValidation = require('./JsonTableValidation');
var ErrorCollector = require('./ErrorCollector');
var mout = require('mout');

var defaultOptions = {
    validateHeader: false
};

function Validator(options) {
    if (typeof options === 'object') {
        var keys = Object.keys(options);
        var idx = keys.length;
        while (idx--) {
            var key = keys[idx];
            if (defaultOptions[key] === undefined) {
                throw new Error('Unexpected option passed to constructor: ' + key);
            }
        }
        this.options = options;
    } else {
        this.options = mout.lang.clone(defaultOptions);
    }
}

Validator.prototype.validate = function(json, schema, callback) {
    var errorsCollector = new ErrorCollector(this.options);

    return JsonTableValidation.validate.call(this, errorsCollector, json, schema);
};

module.exports = Validator;
