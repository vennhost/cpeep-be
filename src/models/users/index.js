const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
 
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "admin"
    },
    name: {
        type: String
    }
});
 
userSchema.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('User', userSchema);