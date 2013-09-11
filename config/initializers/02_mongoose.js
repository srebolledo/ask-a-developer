var mongoose = require('mongoose');
var _ = require('underscore');
var logger = require('log4js' ).getLogger("Mongoose initializer");
var config = require('../config');

module.exports = function(done){
    var self = this;
    logger.info("Initializing mongoose, params: host "+config.mongodb.host + ", db_name: "+config.mongodb.db_name);

    mongoose.connect('mongodb://'+config.mongodb.host+'/'+config.mongodb.db_name, function(err){
        if(err){
            done("It appears that MongoDB is not running. Check your MongoDB instance. " + err.toString());
        }
        logger.info("Mongoose is initialized!");
        done();
    });
}