const express = require("express");
const router  = express.Router();

router.get("/", (req, res) => res.json({message: "hello man!", user: req.user}));

module.exports = router;