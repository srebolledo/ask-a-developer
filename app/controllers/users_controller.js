var locomotive = require( 'locomotive' )
    , Controller = locomotive.Controller;
var passport = require( 'passport' );
var logger = require( 'log4js' ).getLogger( 'Users controller' );
var UsersController = new Controller();
var userModel = global.models.User;
var login = require('connect-ensure-login');

UsersController.index = function () {
    this.title = 'Locomotive';
    this.passedVar = "hello!";
    this.render();
}

UsersController.new = function () {
    this.render();
}
UsersController.show = function () {
    this.render();
}
UsersController.create = function () {
    var self = this;
    var userData = {
        username: this.param( 'username' ),
        password: this.param( 'password' ),
        email   : this.param( 'username' )
    };

    userModel.createUser( userData, function(err){
        if(err){
            logger.error(err);
        }
        self.redirect( '/users' );
    } );
}

UsersController.before('*', login.ensureLoggedIn('/login'));

UsersController.before( '*', function ( next ) {
    this.__res.locals.user = this.__req.user;
    var filename = __filename.split("/")[__filename.split("/").length -1].split("_")[0];
    this.__res.locals.controllerCss = [filename, "css"].join(".");
    next();
} );
module.exports = UsersController;
