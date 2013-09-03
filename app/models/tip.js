var mongoose = require('mongoose');
var types = mongoose.Schema.Types;
var schema = {
    name  : "Tip",
    schema: {
    }
};

var methods = {};


module.exports = function () {
    schema.schema = new mongoose.Schema( schema.schema );
    schema.schema.methods = methods;
    return schema;
}();
