const passport = require("passport");
const passport_jwt = require("passport-jwt");
const ExtractJwt =  passport_jwt.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passport_jwt.Strategy;

const User = require("../models/user");

//add local strategy
passport.use(new LocalStrategy({usernameField: "email", session: false}, (email, password, done) => {
    User.findOne({ email })
    .then(user => {
        if (!user) return done(null, false, {message: "Login failed!. Please try again :("});
        console.log("helloo");
        User.comparePassword(user._id, password, (err, same)=>{
            if(err) return done(err);

            if(!same) return done(null, false, {message: 'Password is incorrect!'});
            const u = user.toObject();
            delete u.password;
            
            return done(null, u);
        });
    });
}));

//add jwt strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  process.env.TOKEN_SECRET_KEY,
};

passport.use(new JWTStrategy(opts, (payload, done) => {
    if(payload.rt) {
        return done(null, false, { message: "Invalid token!" });
    } else {
       return done(null, payload);
    }
}));