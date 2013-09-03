var locomotive = require( 'locomotive' )
    , Controller = locomotive.Controller;
var passport = require( 'passport' );
var logger = require( 'log4js' ).getLogger( 'Tips controller' );
var TipsController = new Controller();

TipsController.index = function () {
    this.title = 'Tips';
    this.render();
}
TipsController.new = function () {
    this.render();
}
TipsController.show = function () {

    this.render();
}
TipsController.create = function () {

}

TipsController.before('*', function (next) {
    this.user = this.__req.user;
    next();
} );


module.exports = TipsController;
