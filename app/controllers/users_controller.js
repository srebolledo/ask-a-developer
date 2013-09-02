var locomotive = require('locomotive')
    , Controller = locomotive.Controller;
var passport = require('passport');


var logger = require('log4js' ).getLogger('Users controller');

var UsersController = new Controller();

UsersController.index = function() {
    this.title = 'Locomotive';
    this.passedVar = "hello!";
    this.render();
}

UsersController.login = function(){
    this.title = "Login";
    this.render();
}

UsersController.loginUser = function(){
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: this.urlFor({action: 'login'})
    })(this.__req, this.__res, this.__next);
}

UsersController.new = function(){
    this.render();
}
UsersController.show = function(){
    this.render();
}
UsersController.create = function(){
    var newUser = global.models.User({
        username: this.param('username'),
        password: this.param('password'),
        email: this.param('username')
    });
    logger.info(newUser);
    newUser.save();
    this.redirect('/login');
}

module.exports = UsersController;
