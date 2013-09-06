var mongoose = require( 'mongoose' );
var types = mongoose.Schema.Types;
var schema = {
    name  : "Tip",
    schema: {
        userId   : String,
        projectId: String,
        tip      : String,
        title    : String,
        tags     : [String],
        thanks   : {type: Number, default: 0}
    }
};

var methods = {};
var statics = {};

statics.addNewTip = function ( schemaObject, cb ) {
    var newTip = this.model( schema.name )( {
        userId   : schemaObject.userId,
        projectId: schemaObject.projectId,
        tip      : schemaObject.tip,
        tags     : schemaObject.tags,
        title    : schemaObject.title
    } );
    newTip.save( function ( err ) {
        if ( err ) {
            return cb( err );
        }
        console.log( "Saving!" );
        cb();
    } );

}

module.exports = function () {
    schema.schema = new mongoose.Schema( schema.schema );
    schema.schema.methods = methods;
    schema.schema.statics = statics;
    return schema;
}();