var mongoose = require( 'mongoose' );
var modelName = __filename.split( "/" )[ __filename.split( "/" ).length - 1 ].split( "." )[ 0 ].capitalize();
var logger = require('log4js' ).getLogger(modelName + ' model');
var schema = {
    name  : modelName,
    schema: {
        title      : String,
        userId     : String,
        description: String
    }
};

var methods = {};
var statics = {};

statics.addNewProject = function ( projectObj, cb ) {
    var newProject = this.model( schema.name )( {
        title      : projectObj.title,
        description: projectObj.description,
        userId     : projectObj.userId
    } );
    newProject.save( function ( err ) {
        if ( err ) {
            return cb( err );
        }
        cb();
    } );
}

module.exports = function () {
    schema.schema = new mongoose.Schema( schema.schema );
    schema.schema.methods = methods;
    schema.schema.statics = statics;
    return schema;
}();
