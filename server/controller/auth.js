
const express = require("express");
const router = express.Router();
const { sign, verify } = require("../lib/jwt");
const passport = require("passport");

router.post("/login", (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: err || info,
                user: user
            });
        }
        req.login(user, { session: false }, async (err) => {
            if (err) {
                res.json(err);
            }
        
            const accessToken = await sign(user, "1h");
            const refreshToken = await sign({ user, rt: true }, "7d");
            return res.json({ user, accessToken, refreshToken });
        });
    })(req, res);
});

router.post("/refreshtoken", (req, res, next) => {
    verify(req.body.refreshToken)
        .then(async (payload) => {
            if (payload.rt) {
                const accesstoken = await sign(payload.user, "1h");
                return res.json({ user: payload.user, accesstoken });
            } else {
                return res.status(400).json({
                    message: "Invalid token!",
                    user: {}
                })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: "Invalid token!",
                user: {}
            })
        });
})

module.exports = router;