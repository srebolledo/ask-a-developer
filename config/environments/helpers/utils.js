var logger = {};
var moment = require("moment");

logger.info = function(msg){
    console.log("[INFO] [%s] %s", moment().format("llll"), msg);
}

logger.error = function(msg){
    console.log("[ERROR] [%s] %s", moment().format("llll"), msg);
}

module.exports = {
    logger: logger
}