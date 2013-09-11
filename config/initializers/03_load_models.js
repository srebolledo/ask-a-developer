var mongoose = require('mongoose');
var schemas = require('../schemas');
var _ = require('underscore');
var logger = require('log4js' ).getLogger("Models initializer");

module.exports = function(){
     //Adding the models to mongoose
    var models = {};
    logger.info("Loading models");
    _.each(schemas.schemas, function(model){
        if(model.schema.name == "" || typeof model.schema.name == "undefined"){
            logger.error("The model " + model.filename + " doesn't export a name, not loading!");
        }
        else{
            logger.info("Loading model: "+model.filename);
            models[model.schema.name] = mongoose.model(model.schema.name, model.schema.schema);
        }
    });
    logger.info("All models loaded");
    global.models = models;
    return models;
}