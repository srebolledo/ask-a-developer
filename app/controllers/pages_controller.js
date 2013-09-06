var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Locomotive'
  this.render();
}

PagesController.before ('*',function(next){
    this.__res.locals.user = this.__req.user;
    next();
});

module.exports = PagesController;
