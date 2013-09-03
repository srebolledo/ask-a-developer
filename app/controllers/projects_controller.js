var locomotive = require( 'locomotive' )
    , Controller = locomotive.Controller;
var passport = require( 'passport' );
var logger = require( 'log4js' ).getLogger( 'Project controller' );
var ProjectsController = new Controller();
var projectModel = global.models.Project;
var ensureLogin = require('connect-ensure-login');

ProjectsController.index = function () {
    var self = this;
    this.title = 'Projects';
    projectModel.find().exec(function(err, data){
        if(err){
            logger.error(err);
            self.render('index',{result: data, errorMsg:err.toString()});
        }
        logger.info(data);
        self.render('index',{result: data});
    })

}

ProjectsController.new = function () {

    this.render();
}
ProjectsController.show = function () {
    this.render();
}
ProjectsController.create = function () {
    var self = this;
    logger.info(this.req.user);
    var projectObj = {
        title: this.param('project_title'),
        userId: this.req.user._id,
        description: this.param('project_description')
    }
    projectModel.addNewProject(projectObj, function(err ){
        if(err){
            logger.error(err);
            this.redirect('/projects?errorMsg='+err.toString());
        }
        self.redirect('/projects');
    })

}
ProjectsController.before('create', function(next){
    ensureLogin.ensureLoggedIn('/login');
    next();
})

ProjectsController.before('new', function(next){
    ensureLogin.ensureLoggedIn('/login');
    next();
})

ProjectsController.before('*', function (next) {
    this.user = this.__req.user;
    next();
} );

module.exports = ProjectsController;
