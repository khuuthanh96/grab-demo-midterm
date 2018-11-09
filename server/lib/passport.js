const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(new LocalStrategy({usernameField: "email", session: false}, (email, password, done) => {
    User.findOne({ email })
    .then(user => {
        if (!user) return done(null, false, {message: "Login failed!. Please try again :("});
        User.comparePassword(user._id, password, (err, same)=>{
            if(err) return done(err);

            if(!same) return done(null, false, {message: 'Password is incorrect!'});
            const u = user.toObject();
            delete u.password;
            
            return done(null, u);
        });
    });
}));
