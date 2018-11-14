require("dotenv").config();
require("./lib/connDatabase");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

require("./lib/passport"); // use passport strategy
const passport = require("passport");

const Request = require("./models/request");


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

const authRouter = require('./controller/auth');
const apiRouter = require('./controller/api');

app.get("/", (req, res) => res.json({"msg": "Welcome to grab-demo-midterm API."}));

app.use("/auth", authRouter);
app.use("/api", passport.authenticate("jwt", {session: false}), apiRouter);

io.on("connect", (socket) => {
    console.log("a user connected: " + socket.id);

    socket.on("newRequest", (data) => {
        const request = new Request({
            clientName: data.client, 
            address: data.address, 
            phone: data.phone, 
            note: data.note,
            state: STATE.CHUA_DINH_VI
        })
        
        request.save()
        .then(result => {
            bookingRequest.push(result);
            
        })
        .catch(err => {
            socket.emit("error", {error: "Invalid request!"});
            console.log(err);
        })
    });

    socket.on("end", () => {
        socket.disconnect(0);
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected: " + socket.id);
    });
});

http.listen(process.env.PORT,() => console.log(`Server listening on port: ${process.env.PORT}`));

// const user = require("./models/user");
// const init = async () => {
//     await user.signUp("admin@gmail.com", "123", "super admin", "123 abc, P3, Q.1", "0123456", "male", "admin");
//     await user.signUp("taixe1@gmail.com", "123", "taixe 1", "321 cba, P1, Q.3", "0123456", "male", "driver");
//     await user.signUp("taixe2@gmail.com", "123", "taixe 2", "543 sfas, P3, Q.10", "0123456", "male", "driver");
//     await user.signUp("taixe3@gmail.com", "123", "taixe 3", "76 vsf, P14, Q.6", "0123456", "male", "driver");

//         // request.newRequest({
//         //     clientName: "Tun",
//         //     address: "nguyen trai, Q.1",
//         //     phone: "0123456"
//         // })
// }
// init();