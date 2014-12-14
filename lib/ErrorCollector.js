'use strict';

function ErrorCollector() {
    this.errors = [];
    this.warnings = [];
    this.infoMessages = [];
}

ErrorCollector.prototype.addError = function(type, category, row, column, content) {
    if (!type) {
        throw new Error('No errorCode passed into addError()');
    }

    var err = {
        type: type,
        category: category,
        row: row,
        column: column,
        content: content
    };

    this.errors.push(err);
};

module.exports = ErrorCollector;
