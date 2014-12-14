/*global describe, it*/
'use strict';

var assert = require('assert');

var schema =
{
    'fields': [
        {
            'name': 'id',
            'title': 'id field',
            'constraints': {
                'required': true,
                'type': 'integer'
            }
        },
        {
            'name': 'email',
            'title': 'email field',
            'constraints': {
                'required': true,
                'type': 'email'
            }
        }
    ]
};

var json = [
    { 'id': 1, 'email': 'a@a.ro'},
    { 'id': 2, 'email': 'b@b.ro'}
];

var json2 = [
    { 'id': 1, 'email': 'a@a.ro'},
    { 'id': 2, 'email': 'b@b.ro'},
    { 'id': '',  'email': 'b@b.ro'}
];

var json3 = [
    { 'id': 'a', 'email': 'a@a.ro'},
    { 'id': 'b', 'email': 'b@b.ro'},
    { 'id': 2, 'email': 'c@c.ro'}
];

var json4 = [
    { 'id': 1, 'email': 'a@a.ro'},
    { 'id': 2, 'email': 'b@b ro'}
];

var valid = true;

describe('Validator tests', function() {
    describe('first test', function() {
        var JSONTableValidator = require('../lib/Validator');
        var validator = new JSONTableValidator();

        it('constructor', function() {
            assert.equal(1, JSONTableValidator.length);
        });

        it('new object', function() {
            assert.notEqual('undefined', validator.length);
        });

        it('validate works 1', function() {
            valid = validator.validate(json, schema);
            assert.equal(true, valid);
        });

        it('validate works 2', function() {
            valid = validator.validate(json2, schema);
            assert.equal(false, valid);
        });

        it('validate works 3', function() {
            valid = validator.validate(json3, schema);
            assert.equal(false, valid);
        });

        it('validate works 4', function() {
            valid = validator.validate(json4, schema);
            assert.equal(false, valid);
        });
    });
});
