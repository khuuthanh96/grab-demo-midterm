const mongoose = require("mongoose");
const { STATE } = require("../lib/const");

const requestSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    driverName: { type: String },
    address: { type: String, required: true },
    phone: { type: String,required: true, trim: true, minlength: 9, maxlength: 12 },
    note: { type: String },
    state: { type: Number },
}, {timestamps: true});

const RequestModel = mongoose.model('Request', requestSchema);

class Request extends RequestModel {
    static async newRequest(clientName, address, phone, note) {
        const request = new Request({ clientName, address, phone, note, state: 0 });
        
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
};

module.exports = Request;