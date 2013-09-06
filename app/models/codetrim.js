var mongoose = require( 'mongoose' );
var schema = {
    name  : "Codetrim",
    schema: {
        title    : String,
        codetrim : String,
        short_url: String,
        views    : {type: Number, default: 0},
        user_id  : String
    }
};

var methods = {};
var statics = {};

statics.saveNew = function ( schemaObj, cb ) {
    var schemaObject = this.model( schema.name )( {
        title    : schemaObj.title,
        codetrim : schemaObj.codetrim,
        short_url: (new mongoose.Types.ObjectId).toHexString().substr( 5, 7 ),
        user_id  : schemaObj.user_id
    } );
    console.log( schemaObject );
    schemaObject.save( function ( err ) {
        if ( err ) {
            return cb( err );
        }
        cb();
    } )
}

module.exports = function () {
    schema.schema = new mongoose.Schema( schema.schema );
    schema.schema.methods = methods;
    schema.schema.statics = statics;
    return schema;
}();
