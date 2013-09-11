var logger = require('log4js').getLogger('Config module');
var _ = require('underscore');
function mergeConfig(){
    var env_config = {};
    try{
        var env_config = require('./env_config/'+global.env);
    }
    catch(e){
        logger.warn(global.env + " config file doesn't exist!");
    }
    var defaultConfig = require('./env_config/default');

    return _.extend(defaultConfig, env_config);

}

module.exports = mergeConfig();