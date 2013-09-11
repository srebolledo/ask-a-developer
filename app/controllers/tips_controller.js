var locomotive = require( 'locomotive' )
    , Controller = locomotive.Controller;
var passport = require( 'passport' );
var logger = require( 'log4js' ).getLogger( 'Tips controller' );
var TipsController = new Controller();
var tipsModel = global.models.Tip;
var ensureLogin = require('connect-ensure-login');
var marked = require('marked');
TipsController.index = function () {
    this.title = 'Tips';
    var self = this;
    tipsModel.find({'projectId': this.params('project_id')},function(err, results){
        if(err){
            logger.error(err);
            self.render();
        }
        self.results = results;
        self.render();
    });

}
TipsController.show = function () {
    var self = this;
    tipsModel.findOne({'_id': this.params('id')},function(err, results){
        if(err){
            logger.error(err);
            self.render();
        }
        results.tip = marked(results.tip);
        self.result = results;

        console.log(self.result)
        self.render();
    })

}
TipsController.new = function () {
    this.render();
}
TipsController.before('*', function (next) {
    this.user = this.__req.user;
    next();
} );

TipsController.create = function () {
    var tipObject = {
        userId: this.req.user._id,
        projectId: this.params('project_id'),
        tip: this.params('tip'),
        tags: this.params('tags').split(","),
        title: this.params('title')
    }
    var self = this;
    tipsModel.addNewTip(tipObject, function(err){
        if(err){
            logger.error(err);
        }
        self.redirect(self.projectTipsPath(self.params('project_id')));
    })

}


TipsController.before('*', ensureLogin.ensureLoggedIn('/login'));

TipsController.before ('*',function(next){
    this.__res.locals.user = this.__req.user;
    this.__res.locals.project_id = this.params('project_id');
    var filename = __filename.split("/")[__filename.split("/").length -1].split("_")[0];
    this.__res.locals.controllerCss = [filename, "css"].join(".");
    next();
});


module.exports = TipsController;
