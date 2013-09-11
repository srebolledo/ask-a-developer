var mongoose = require( 'mongoose' );
var modelName = __filename.split( "/" )[ __filename.split( "/" ).length - 1 ].split( "." )[ 0 ].capitalize();
var logger = require('log4js' ).getLogger(modelName + ' model');
var _ = require('underscore');
var schema = {
    name  : modelName,
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

statics.saveData = function ( schemaObj, cb ) {
    logger.info(schemaObj);
    var schemaObject = this.model( schema.name )( {
        title    : schemaObj.title,
        codetrim : schemaObj.codetrim,
        short_url: (new mongoose.Types.ObjectId).toHexString().substr( 5, 7 ),
        user_id  : schemaObj.user_id
    } );
    if(schemaObj.id){
        schemaObject = {}
        schemaObject.title = schemaObj.title;
        schemaObject.codetrim = schemaObj.codetrim;
        this.model(schema.name ).findById(schemaObj.id, function(err, doc){
            if(err){
                return cb(err);
            }
            _.extend(doc, schemaObject);
            doc.save(function(err){
                if(err){
                    return cb(err);
                }
                cb();
            });
        });
    }
    else{
        schemaObject.save( function ( err ) {
            if ( err ) {
                return cb( err );
            }
            cb();
        } )
    }

}

module.exports = function () {
    schema.schema = new mongoose.Schema( schema.schema );
    schema.schema.methods = methods;
    schema.schema.statics = statics;
    return schema;
}();
