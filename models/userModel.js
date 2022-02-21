const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    userName: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;