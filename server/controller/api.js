const express = require("express");
const router  = express.Router();

const user = require("../models/user");
const request = require("../models/request");

const STATE = {
    CHUA_DINH_VI: 0,
    DA_DINH_VI: 1,
    XE_NHAN: 2,
    DANG_DI_CHUYEN: 3,
    DA_HOAN_THANH: 4
} 


router.get("/", (req, res) => res.json({message: `Hello ${req.user.name}`}));

router.get("/user/driver", (req, res) => {
    user.find()
    .then(rows => {
        res.json({
            success: true,
            data: rows
        });
    })
    .catch(err => {
        console.log(err);
        res.json({
            data: [],
            success: false
        });
    });
});

router.put("/user/active", (req, res) => {
    if(typeof req.body.active != "boolean") {
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
        return
    }

    user.findByIdAndUpdate(req.user._id, { $set: { "active": req.body.active }})
    .then(() => {
        res.json({
            success: true,
        })
    })
    .catch(err => {
        console.log("Set active for user findByIdAndUpdate: ", err);
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
    });
});

router.get("/user/logout", (req, res) => {
    user.findByIdAndUpdate(req.user._id, { $set: { "status": false }})
    .then(() => {
        res.json({
            success: true,
        })
    })
    .catch(err => {
        console.log("Set active for user findByIdAndUpdate: ", err);
        res.json({
            success: false,
            message: "lỗi hệ thống"
        })
    });
});

router.put("/user/location", (req, res) => {
    const { lat, long } = req.body;
    if(typeof lat != "number" || typeof long != "number") {
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        }) 
        return
    }

    user.findByIdAndUpdate(req.user._id, { $set: {"lat": lat, "long": long }})
    .then(() => {
        res.json({
            success: true,
        })
    })
    .catch(err => {
        console.log("Set active for user findByIdAndUpdate: ", err);
        res.json({
            success: false,
            message: "lỗi hệ thống"
        })
    });
});

router.get("/request", (req, res) => {
    request.find()
    .then(rows => {
        res.json({
            success: true,
            data: rows
        });
    })
    .catch(err => {
        console.log(err);
        res.json({
            data: [],
            success: false
        });
    });
});

router.post("/request", async (req, res) => {
    const { clientName, address, phone, note } = req.body;
    if (typeof clientName != "string" || typeof address != "string" || typeof phone != "string" || typeof note != "string") {
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
        return
    };

    const newReq = await request.newRequest(clientName, address, phone, note);
    if (newReq) {
        res.json({
            success: true,
            data: newReq
        })
    } else {
        res.json({
            success: false,
            message: "lỗi hệ thống"
        })
    }
});

router.put("/request/state/:id", (req, res) => {
    const id = req.params.id;
    const state = req.body.state;
    if(typeof state != "string") {
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
        return
    }
    const myState = STATE[state];

    request.findByIdAndUpdate(id, { $set: { "state": myState }})
    .then(() => {
        res.json({
            success: true,
        })
    })
    .catch(err => {
        console.log("Set active for user findByIdAndUpdate: ", err);
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
    });
});

module.exports = router;