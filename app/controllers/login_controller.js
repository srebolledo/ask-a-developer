var locomotive = require( 'locomotive' )
    , Controller = locomotive.Controller;
var logger = require( 'log4js' ).getLogger( 'Users controller' );
var LoginController = new Controller();
var login = require('connect-ensure-login');
var passport = require('passport');

LoginController.login = function () {
    this.title = "Login";
    this.render();
}

LoginController.loginUser = function () {
    passport.authenticate( 'local', {
        successRedirect: '/',
        failureRedirect: this.urlFor( {action: 'login'} )
    } )( this.__req, this.__res, this.__next );
}

LoginController.logout = function(){
    this.__req.logout();
    this.redirect('/');
}


LoginController.before('login', login.ensureLoggedOut('/'));
LoginController.before('logout', login.ensureLoggedIn('/'));
module.exports = LoginController;
