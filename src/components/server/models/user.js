const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    password: String
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;