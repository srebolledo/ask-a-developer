var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Locomotive'
  this.render();
}

PagesController.before ('*',function(next){
    this.__res.locals.user = this.__req.user;
    console.log(this.__res.locals);
    next();
});

module.exports = PagesController;
