// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.

var passport = require('passport');
var logger = require('log4js' ).getLogger('Router')
var checkLogin = require('connect-ensure-login');

module.exports = function routes() {
    this.root( 'pages#main' );
//If we use resources, this create several predefined routes
// this.resources('photos');
//    Method	Path	Action
//    GET	/photos	    index
//    GET	/photos/new	new
//    POST	/photos	    create
//    GET	/photos/:id	show
//    GET	/photos/:id/edit	edit
//    PUT	/photos/:id	update
//    DELETE	/photos/:id	destroy
//And this helpers
//    Helper	Returns
//    photosPath()	/photos
//    photoPath(id)	/photos/123
//    newPhotoPath()	/photos/new
//    editPhotoPath(id)	/photos/123/edit

    this.resources('users');
    this.resources('projects', function(){
        this.resources('tips');
    });

    //Login and Logout things
    this.match('login', "login#login", { via: 'get' });
    this.match('logout', "login#logout");
    this.match('login', 'login#loginUser', { via: 'post' });

}
