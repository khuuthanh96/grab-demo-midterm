const mongoose = require("mongoose");
const { STATE } = require("../lib/const");

const requestSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    driverName: { type: String },
    driverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: { type: String, required: true },
    phone: { type: String,required: true, trim: true, minlength: 9, maxlength: 12 },
    note: { type: String },
    state: { type: Number },
    locatedLat: { type: Number },
    locatedLng: { type: Number },

}, {timestamps: true});

const RequestModel = mongoose.model('Request', requestSchema);

class Request extends RequestModel {
    static async newRequest(clientName, address, phone, note, clientID ) {
        const request = new Request({ clientName, address, phone, note, state: 0, clientID });
        
        await request.save()
        .catch(error => {
            console.log(error)
        });

        return request;
    }

    static async findRequestAcceptedByID(id) {
        const req = await Request.findById(id)
        .catch(err => console.log(err))
        if(typeof req == "undefined") return false;

        if(req.state == STATE.XE_NHAN) {
            return req;
        } else {
            return false;
        }
    }

    static async findLocatedByDriverID(uID) {
        const state = STATE["DA_DINH_VI"];
        const req = await Request.find({"state": state, "driverID": uID})
        .catch(err => console.log(err))
        if(typeof req == "undefined") return false;

        if(req.driverID === uID) {
            return req;
        } else {
            return false;
        }
    }
};

module.exports = Request;