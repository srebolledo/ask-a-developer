var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var controllerName = __filename.split("/")[__filename.split("/").length -1].split("_")[0];
var logger = require( 'log4js' ).getLogger( controllerName.capitalize()+' controller' );
var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Locomotive'
  this.render();
}

PagesController.before ('*',function(next){
    this.__res.locals.user = this.__req.user;
    this.__res.locals.controllerName = controllerName;
    next();
});

module.exports = PagesController;
