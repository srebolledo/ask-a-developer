var mongoose = require('mongoose');
var schemas = require('../schemas');
var _ = require('underscore');
var logger = require('log4js' ).getLogger("Mongoose initializer");
var config = require('../config');



module.exports = function(){
    var self = this;
    logger.info("Initializing mongoose");
    var mongoConfig = config[this.env].mongodb;
    mongoose.connect('mongodb://'+mongoConfig.host+'/'+mongoConfig.db_name);

    //Adding the models to mongoose
    var models = {};
    _.each(schemas.schemas, function(model){
        if(model.schema.name == "" || typeof model.schema.name == "undefined"){
            logger.error("The model " + model.filename + " doesn't export a name, not loading!");
        }
        else{
            logger.info("Loading model: "+model.filename);
            models[model.schema.name] = mongoose.model(model.schema.name, model.schema.schema);
        }
    });
    global.models = models;
    return models;
}