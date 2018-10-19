const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 1234
const app = express()

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.json({"msg": "Welcome to grab-demo-midterm API."}));

app.listen(PORT,() => console.log(`Server listening on port: ${PORT}`));