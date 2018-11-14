const mongoose = require("mongoose");
const {hash, compare} = require("bcrypt");

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, trim:true},
    name: { type: String, required: true, trim: true, minlength: 6, maxlength: 40 },
    phone: { type: String,required: true, trim: true, minlength: 9, maxlength: 12 },
    sex: { type: String, enum: ['male', 'female'], default: 'male' },
    address: { type: String, required: true },
    roles: {
        type: String,
        enum: ['driver', 'admin', 'user'],
        default: 'user'
    },
    active: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    lat: { type: Number, default: 0 },
    long: { type: Number, default: 0 }
});

const UserModel = mongoose.model('User', userSchema);

class User extends UserModel {
    static async signUp(email, password, name, address, phone, sex, roles) {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name, address, phone, sex, roles});
        
        await user.save()
        .catch(error => {
            console.log(error)
        });
        const u = user.toObject();
        delete u.password;
        return u;
    }

    static async comparePassword(idUser, password, cb) {
        User.findById(idUser)
        .then(user => {
            compare(password, user.password, (err, same)=> {
                if(err) return cb(err);
                return cb(null, same);
            });
        })
        .catch(err => {
            cb(err, false);
        });
    }
};

module.exports = User;