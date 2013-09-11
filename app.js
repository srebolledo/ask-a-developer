var package = require('./package.json');
var locomotive = require('locomotive'),
    env = process.env.NODE_ENV || 'development'
var logger = require('log4js').getLogger(package.name + "-" + package.version);

locomotive.boot(__dirname, env, function(err, server) {
    if (err) { 
      logger.error(err);
      process.exit(1)
    }
    var config = require('./config/config.js');
    var port = config.server.port;
    var address = config.server.address;
    server.listen(port, address, function() {
        var addr = this.address();
        logger.info('All loaded, booting up! Point your browser to %s:%d', addr.address, addr.port);
    });
});