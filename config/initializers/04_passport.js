var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('log4js' ).getLogger('Passport initializer');
var User = global.models.User;
var crypto = require('crypto');

module.exports = function() {
    logger.info('Initializing passport');
    passport.serializeUser(function(user, done) {

        done(null, user);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id._id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                if (!(crypto.createHash('sha1' ).update( password ).digest('hex') == user.password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));
}