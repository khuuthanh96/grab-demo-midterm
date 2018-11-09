const jwt = require('jsonwebtoken');

function sign(payload, type) {
    if (type === "REFRESH_TOKEN") {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.SECRET_KEY_REFRESH_TOKEN, { expiresIn: "1h" }, (err, token) => {
                if(err) return reject(err);
                resolve(token);
            })
        });
    } else if (type === "ACCESS_TOKEN") {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: "7d" }, (err, token) => {
                if(err) return reject(err);
                resolve(token);
            })
        });
    };
};

function verify(token, type) {
    if (type === "REFRESH_TOKEN") {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY_REFRESH_TOKEN, (err, obj) => {
                if(err) return reject(err);
                resolve(obj);
            });
        });
    } else if (type === "ACCESS_TOKEN") {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY_ACCESS_TOKEN, (err, obj) => {
                if(err) return reject(err);
                resolve(obj);
            });
        });
    };
};
module.exports = { sign, verify };