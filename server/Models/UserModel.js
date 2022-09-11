const mongoose = require('mongoose');
const {Schema} = mongoose;
const {isEmail, isStrongPassword} = require('validator');
const bcrypt = require("bcrypt");

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, '{PATH} alanı boş bırakılamaz'],
        maxlength: [32, '{PATH} alanı maksimum {MAXLENGTH} karakter uzunluğunda olabilir!'],
        minlength: [4, '{PATH} alanı minimum {MINLENGTH} karakter uzunluğunda olmalıdır!'],
        unique: [true, '{PATH} alanı benzersiz olmalıdır. Bu kullanıcı adı kullanılmakta!'],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, '{PATH} alanı boş bırakılamaz!'],
        unique: [true, '{PATH} alanı benzersiz olmalıdır. Bu e-posta adresi kullanılmakta!'],
        lowercase: true,
        validate: [isEmail, '{PATH} alanı geçerli bir e-posta adresi olmalıdır!']
    },
    password: {
        type: String,
        minlength: [6, '{PATH} alanı minimum {MINLENGTH} karakter uzunluğunda olmalıdır!'],
        required: [true, '{PATH} alanı boş bırakılamaz!'],
        validate: [isStrongPassword, '{PATH} alanı güçlü bir parola olmalıdır!']
    }
}, {
    timestamps: true
});


UserSchema.pre('save', async function (nextFunction) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    nextFunction();
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
