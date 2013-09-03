var mongoose = require( 'mongoose' );
var crypto = require('crypto' );
var types = mongoose.Schema.Types;
var schema = {
    name  : "User",
    schema: {
        id      : String,
        username: String,
        password: String,
        email   : String,
    }
};

var methods = {};
var statics = {};

statics.validPassword = function ( user, password ) {
    return user._doc.password == password;
};
statics.createUser = function(userData, cb){
    var newUser =  this.model( schema.name )( {
        username: userData.username,
        password: crypto.createHash('sha1' ).update(userData.password ).digest('hex'),
        email   : userData.username
    } );
    newUser.save(function(err){
        if(err){
            logger.info(err);
            return cb(err);

        }
        cb();
    });
};

module.exports = function () {
    schema.schema = new mongoose.Schema( schema.schema );

    //Defining methods
    schema.schema.methods = methods;
    schema.schema.statics = statics;

    return schema;
}();
