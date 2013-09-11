var locomotive = require( 'locomotive' )
    , Controller = locomotive.Controller;
var passport = require( 'passport' );
var controllerName = __filename.split("/")[__filename.split("/").length -1].split("_")[0];
var logger = require( 'log4js' ).getLogger( controllerName.capitalize()+' controller' );
var CodetrimsController = new Controller();
var codetrimModel = global.models.Codetrim;
var ensureLogin = require( 'connect-ensure-login' );

CodetrimsController.index = function () {
    var self = this;
    this.title = 'Code trims';
    codetrimModel.find({}, function ( err, data ) {
        if ( err ) {
            logger.error( err );
            self.render( 'index', {result: data, errorMsg: err.toString()} );
        }
        console.log(data);
        self.render( 'index', {results: data} );
    } );
}

CodetrimsController.new = function () {
    this.title = "New codetrim";
    this.render();

}

CodetrimsController.show = function () {
//    codetrimModel.sumView(this.param('id'));

    var self = this;
    codetrimModel.findOne({'_id': this.params('id')},function(err, results){
        if(err){
            logger.error(err);
            self.render();
        }
        self.result = results;
        console.log(self.result);
        self.render();
    })
}

CodetrimsController.create = function () {
    var self = this;
    var codetrimObj = {
        title   : this.param( 'title' ),
        user_id  : this.req.user._id,
        codetrim: this.param( 'codetrim' ),
        id: this.param('id')
    }
    codetrimModel.saveData( codetrimObj, function ( err ) {
        if ( err ) {
            logger.error( err );
            this.redirect( self.codetrimsPath() );
        }
        if(this.param('id')) self.redirect(self.codetrimPath(this.param('id')));
        self.redirect( self.codetrimsPath() );
    } );
}

CodetrimsController.edit = function(){
    var self = this;
    codetrimModel.findOne({'_id': this.params('id')},function(err, results){
        if(err){
            logger.error(err);
            self.render();
        }
        self.result = results;
        self.render();
    });
}

CodetrimsController.shortUrl = function(){
    var self = this;
    codetrimModel.findOne({'short_url': this.params('short_url')},function(err, results){
        if(err){
            logger.error(err);
            self.render();
        }
        self.result = results;
        self.render('codetrims/show');
    });
}

CodetrimsController.before( ['new', 'create', 'show', 'edit', 'index'], ensureLogin.ensureLoggedIn( '/login' ) );

CodetrimsController.before( '*', function ( next ) {
    this.__res.locals.user = this.__req.user;
    this.__res.locals.controllerName = controllerName;
    next();
} );

module.exports = CodetrimsController;