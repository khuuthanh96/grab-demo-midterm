const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    driverName: { type: String },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    note: { type: String },
    state: { type: Number },
}, {timestamps: true});

const RequestModel = mongoose.model('Request', requestSchema);

class Request extends RequestModel {
};

module.exports = Request;