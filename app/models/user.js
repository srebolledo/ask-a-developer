var mongoose = require( 'mongoose' );

var validPassword = function ( user, password ) {
    return user._doc.password == password;
};

var schema = {
    name  : "User",
    schema: {
        id      : "string",
        username: "string",
        password: "string",
        email   : "string",
    }
};


module.exports = function () {
    schema.schema = new mongoose.Schema( schema.schema );
    schema.schema.methods = {
        validPassword: validPassword
    }
    return schema;
}();
