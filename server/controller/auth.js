
const express = require("express");
const router  = express.Router();
const {sign, verify} = require("../lib/jwt");
const passport = require("passport");

router.post("/login", (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: err || info,
                user   : user
            });
        }
       req.login(user, {session: false}, async (err) => {
           if (err) {
               res.json(err);
           }

           const accessToken = await sign(user, "ACCESS_TOKEN")
           const refreshToken = await sign(user, "REFRESH_TOKEN");
           return res.json({user, accessToken, refreshToken});
        });
    })(req, res);
});


module.exports = router;