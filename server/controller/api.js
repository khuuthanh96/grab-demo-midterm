const express = require("express");
const router  = express.Router();

const user = require("../models/user");
const request = require("../models/request");
const {findNearestDriver} = require("../lib/haversineService");
const { STATE } = require("../lib/const");

const mongoose = require("mongoose");

//số lần gửi lại yêu cầu của 1 request khi bị từ chối
const RESEND = 5;

router.get("/", (req, res) => res.json({message: `Hello ${req.user.name}`}));

//=========================================USER=========================================

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

router.put("/user/status", (req, res) => {
    if(typeof req.body.status != "boolean") {
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
        return
    }

    user.findByIdAndUpdate(req.user._id, { $set: { "status": req.body.status }})
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

router.get("/user/driver/ready/:uID", (req, res) => {
    const id = req.params.id;
    const myInterval = setInterval(async () => {
        const myReq = await findLocatedByDriverID(id);
        if(myReq) {
            res.json({
                success: true,
                data: myReq
            });
            clearInterval(myInterval);
            clearTimeout(myTimeout)
            return
        }
    }, 4000);
 
    const myTimeout = setTimeout(() => {
        clearInterval(myInterval);
        request.findByIdAndRemove(id);
        res.json({
            success: false,
            data: {}
        })
    }, 60*1000)
});

router.put("/user/driver/cancel/:uID", (req, res) => {
    const driverID = req.params.uID;
    const state = STATE["DA_DINH_VI"];
    //tìm request với thông tin tài xế và trạng thái
    request.findOne({driverID, state, resend: { $lt: RESEND }} )
    .then(myreq => {
        if (!myreq) {
            res.json({
                success: false,
                message: "không tìm thấy request cho driverid"
            });
            return
        }

        //người cuối cùng từ chối
        if (myreq.resend === RESEND - 1) {
            myreq.cancelled.push(driverID)

            request.findByIdAndUpdate(myreq._id, { $set: {state: STATE["TAI_XE_HUY_YEU_CAU"], cancelled: myreq.cancelled, resend: myreq.resend+=1 }})
            .catch(err => console.log(err))
            res.json({success: true})
            return
        }

        //thêm id của tài xế thực hiện request vào danh sách từ chối
        const _driverID = mongoose.mongo.ObjectID(driverID); //ép kiểu về objectID
        myreq.cancelled.push(_driverID);

        //lấy danh sách tài xê và loại bỏ tài xế từ chối khỏi danh sách định vị
        const cancelledListLength = myreq.cancelled.length;
        return user.find({"active": true, "roles": "driver"})
        .then(driverList => {
            //lọc lại danh sách để gởi yêu cầu đặt xe
            if(cancelledListLength > 0){
                for (let i = 0; i < driverList.length; i++) {
                    //tìm xem danh sách tài xế đã từ chối và loại bỏ khoi danh sách định vị
                    for (let j = 0; j < cancelledListLength; j++) {
                        if (JSON.stringify(myreq.cancelled[j]) == JSON.stringify(driverList[i]._id)) {
                            driverList.splice(i, 1);
                        };
                    };
                };
            }

            const qualifyDriver = findNearestDriver(driverList, { lat: myreq.locatedLat, lng: myreq.locatedLng });

            //nếu không tìm được thì response về người dùng
            if(!qualifyDriver) return request.findByIdAndUpdate(myreq._id, { $set: {driverName: "", driverID: null,cancelled:myreq.cancelled, resend: myreq.resend+=1 }});


            return request.findByIdAndUpdate(myreq._id, { $set: {driverName: qualifyDriver.name, driverID: qualifyDriver.id,cancelled:myreq.cancelled, resend: myreq.resend+=1 }});
        })
        .then(_ => {
            res.json({success: true})
            return
        })
    })
    .catch(err =>  {
        console.log(err)
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
    })
});

router.put("/user/logout", (req, res) => {
    user.findByIdAndUpdate(req.user._id, { $set: { "active": false }})
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

//=========================================REQUEST=========================================

router.get("/request", (req, res) => {
    const state = req.query.state;
    const myState = STATE[state];

    if(typeof state !== "undefined" && typeof myState !== "undefined") {
        request.find({state: myState})
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
    } else {
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
    }
 
});

router.post("/request", async (req, res) => {
    const { clientName, address, phone, note, clientID } = req.body;
    if (typeof clientName != "string" || typeof address != "string" || typeof phone != "string") {
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
        return
    };

    const newReq = await request.newRequest(clientName, address, phone, note, clientID);
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

    if(myState === 1) {
        const { lat, lng } = req.body;
        request.findByIdAndUpdate(id, { $set: { "state": myState, "locatedLat": lat, "locatedLng": lng }})
        .then(() => {
            res.json({
                success: true,
            })
        })
        .catch(err => {
            console.log("Set state for request findByIdAndUpdate: ", err);
            res.json({
                success: false,
                message: "dữ liệu không hợp lệ"
            })
        });
    }
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

router.put("/request/located/:id", (req, res) => {
    const id = req.params.id;
    const { lat, lng, state } = req.body;
    if(typeof state != "string") {
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
        return
    }
    const myState = STATE[state];

    request.findByIdAndUpdate(id, { $set: {"locatedLat": lat, "locatedLng": lng, "state": myState}})
    .then(_ => {
        return user.find({"active": true, "roles": "driver"});
    })
    .then(driverList => {
        const qualifyDriver = findNearestDriver(driverList, { lat, lng });
        return request.findByIdAndUpdate(id, { $set: {"driverName": qualifyDriver.name, "driverID": qualifyDriver.id }})
    })
    .then(_ => {
        res.json({success: true})
    })
    .catch(err =>  {
        console.log(err)
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
    });
    
})

router.put("/request/foundDriver/:id", (req, res) => {
    const id = req.params.id;
    const { driverName, driverID, state } = req.body;
    if(typeof state != "string") {
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
        return
    }
    const myState = STATE[state];

    request.findByIdAndUpdate(id, { $set: {"driverID": driverID, "driverName": driverName, "state": myState}})
    .then(_ => {
        res.json({
            success: true
        })
    })
    .catch(err =>  {
        console.log(err)
        res.json({
            success: false,
            message: "dữ liệu không hợp lệ"
        })
    });
    
})

router.get("/request/accepted/:reqID", (req, res) => {
    const id = req.params.reqID;
    const myInterval = setInterval(async () => {
        const myReq = await request.findRequestAcceptedByID(id);
        if(myReq) {
            res.json({
                success: true,
                data: myReq
            });
            clearInterval(myInterval);
            clearTimeout(myTimeout)
            return
        }
    }, 4000)
 
    const myTimeout = setTimeout(() => {
        clearInterval(myInterval);
        request.findByIdAndRemove(id);
        res.json({
            success: false,
            data: {}
        })
    }, 60*1000)
});

router.put("/request/delete/:id", (req, res) => {
    request.findByIdAndRemove(req.params.id)
    .then(() => {
        res.json({
            success: true,
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            success: false
        })
    });
});
module.exports = router;