var package = require('../../package.json');
var logger = require('log4js' ).getLogger(package.name+"-"+package.version);

module.exports = function() {
  logger.info("Hey! Welcome to "+package.name+"-"+package.version+" app!");
  //Setting the environment
  if(process.env.NODE_ENV == undefined)
    global.env = "development";
  else
    global.env = process.env.NODE_ENV;

  logger.info("Loading \""+ global.env + "\" configuration");
  // Any files in this directory will be `require()`'ed when the application
  // starts, and the exported function will be invoked with a `this` context of
    // the application itself.  Initializers are used to connect to databases and
    // message queues, and configure sub-systems such as authentication.

    // Async initializers are declared by exporting `function(done) { /*...*/ }`.
    // `done` is a callback which must be invoked when the initializer is
  // finished.  Initializers are invoked sequentially, ensuring that the
  // previous one has completed before the next one executes.
}
