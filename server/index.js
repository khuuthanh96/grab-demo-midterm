require("dotenv").config();
require("./models/connDatabase");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

require("./lib/passport"); // use passport strategy

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.json({"msg": "Welcome to grab-demo-midterm API."}));
const authRouter = require('./controller/auth');

app.use("/auth", authRouter);

var readyDriver = [];

io.on("connection", (socket) => {
    console.log("a user connected: " + socket.id);

    socket.on("newRequest", (data) => {
        // console.log("send a new time to client with interval: " + interval);
        console.log(data);
        socket.emit("updateData", {
            name: data.name + " hacked",
            address:  data.address + " hacked",
            phone:  data.phone * 2,
            descriptions:  data.descriptions + " hacked"
        });

        // setInterval(() => {
        //     socket.emit("timer", new Date().getSeconds());
        //     console.log("1s")
        // }, 1000);
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected: " + socket.id);
    });
});

http.listen(process.env.PORT,() => console.log(`Server listening on port: ${process.env.PORT}`));

const user = require("./models/user");

// const init = async () => {
//     await user.signUp("admin@gmail.com", "123", "super admin", "123 abc, P3, Q.1", "0123456", "male", "admin");
//     await user.signUp("taixe1@gmail.com", "123", "taixe 1", "321 cba, P1, Q.3", "0123456", "male", "driver");
//     await user.signUp("taixe2@gmail.com", "123", "taixe 2", "543 sfas, P3, Q.10", "0123456", "male", "driver");
//     await user.signUp("taixe3@gmail.com", "123", "taixe 3", "76 vsf, P14, Q.6", "0123456", "male", "driver");
// }
// init();