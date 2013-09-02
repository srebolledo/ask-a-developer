// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.

var passport = require('passport');
var logger = require('log4js' ).getLogger('Router')

module.exports = function routes() {
    this.root( 'pages#main' );
    this.resources('tips');
    this.resources('users');
    this.match('login', "users#login");
    this.match('login', 'users#loginUser', { via: 'post' });

}
