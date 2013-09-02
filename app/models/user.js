var mongoose = require( 'mongoose' );
var crypto = require('crypto' );

var validPassword = function ( user, password ) {
    return user._doc.password == password;
};

var createUser = function(userData, cb){
    var newUser = global.models.User( {
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

    //Defining methods
    schema.schema.methods.validPassword = validPassword;
    schema.schema.methods.createUser = createUser

    return schema;
}();
