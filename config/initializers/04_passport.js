var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

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

    passport.use(new FacebookStrategy({
            clientID: "588876477843061",
            clientSecret: "0006b7c70b6d0d25eb3ca9dbcbf7343f",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            var user = new User();
            user.id = "f".concat(profile.id);
            user.username = profile.username;
            user.email = profile;
            user.payload = profile;
            user.provider = "facebook";
            user = user.toObject();
            delete user._id;
            User.findOneAndUpdate({id: user.id}, user, {new: true, upsert: true}, function(err, user){
                logger.info(err, user);
                done(null, user);
            })       
        }
    ));
    // passport.use(new TwitterStrategy({
    //         consumerKey: "4NORMXphTuWxaLv8rDMzA",
    //         consumerSecret: "RttxOMR5mwnu5byUp9RhE7B8IobH3k54Z2g1iUWgELA",
    //         callbackURL: "http://localhost:3000/auth/facebook/callback"
    //     },
    //     function(consumerKey, consumerSecret, profile, done) {
    //         logger.info(profile);
    //         process.exit(1);
    //         // var user = new User();
    //         // user.id = "f".concat(profile.id);
    //         // user.username = profile.username;
    //         // user.email = profile;
    //         // user.payload = profile;
    //         // user.provider = "facebook";
    //         // user = user.toObject();
    //         // delete user._id;
    //         // User.findOneAndUpdate({id: user.id}, user, {new: true, upsert: true}, function(err, user){
    //         //     logger.info(err, user);
    //         //     done(null, user);
    //         // })       
    //     }
    // ));
}