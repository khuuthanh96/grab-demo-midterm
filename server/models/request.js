const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    driverName: { type: String },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    note: { type: String }
});

const RequestModel = mongoose.model('Request', requestSchema);

class Request extends RequestModel {
    static newRequest(req) {
        const request = new Request(req);

        request.save()
        .then(newReq => console.log("success: ", newReq))
        .catch(err => console.log("newRequest fail!"));

        return "ok";
    };
};

module.exports = Request;