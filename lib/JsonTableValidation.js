'use strict';

var ErrorCollector = require('./ErrorCollector');
var mout = require('mout');

var Validators = {
    required: function(errorsCollector, json, field) {
        var row = null;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (row[field.name] === undefined || row[field.name] === null || row[field.name] === '') {
                errorsCollector.addError('missing_value', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    string: function(errorsCollector, json, field) {
        var row = null;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!mout.lang.isString(row[field.name])) {
                errorsCollector.addError('invalid_type', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    integer: function(errorsCollector, json, field) {
        var row = null;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!mout.lang.isInteger(row[field.name])) {
                errorsCollector.addError('invalid_type', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    number: function(errorsCollector, json, field) {
        var row = null;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!mout.lang.isNumber(row[field.name])) {
                errorsCollector.addError('invalid_type', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    URL:  function(errorsCollector, json, field) {
        var row = null;

        var uriExpr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!uriExpr.test(row[field.name])) {
                errorsCollector.addError('invalid_type', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    boolean: function(errorsCollector, json, field) {
        var row = null;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!mout.lang.isBoolean(row[field.name])) {
                errorsCollector.addError('invalid_type', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    date: function(errorsCollector, json, field) {
        var row = null;

        // YYYY-MM-DD
        var dateExpr = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!dateExpr.test(row[field.name])) {
                errorsCollector.addError('invalid_type', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    datetime: function(errorsCollector, json, field) {
        var row = null;

        // YYYY-MM-DD HH:MM:SS
        var dateTimeExpr = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31) ([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!dateTimeExpr.test(row[field.name])) {
                errorsCollector.addError('invalid_type', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    time: function(errorsCollector, json, field) {
        var row = null;

        // HH:MM:SS.mmm
        var timeExpr = /^((([0-1]?[0-9])|([2][0-3])):)?(([0-5][0-9]):)?([0-5][0-9])(\.\d{1,3})?$|^\d+(\.\d{1,3})?$/;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!timeExpr.test(row[field.name])) {
                errorsCollector.addError('invalid_type', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    },

    email: function(errorsCollector, json, field) {
        var row = null;

        var emailExpr = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

        for (var i = 0; i < json.length; i++) {
            row  = json[i];

            if (!emailExpr.test(row[field.name])) {
                errorsCollector.addError('invalid_email', 'schema', i, field.name, row[field.name]);
                break;
            }
        }
    }
};

exports.validate = function(errorsCollector, json, schema) {
    // check if schema fields is empty, everything is valid against empty schema
    if (schema.fields.length === 0) {
        return true;
    }

    var field = null;

    for (var i = 0; i < schema.fields.length; i++) {
        field = schema.fields[i];

        if (field.constraints) {
            if (field.constraints.required) {
                Validators.required.call(this, errorsCollector, json, field);
                if (errorsCollector.errors.length) {
                    break;
                }
            }

            if (field.constraints.type) {
                Validators[field.constraints.type].call(this, errorsCollector, json, field);
                if (errorsCollector.errors.length) {
                    break;
                }
            }
        }
    }
    console.log(errorsCollector);
    return errorsCollector.errors.length === 0;
};
