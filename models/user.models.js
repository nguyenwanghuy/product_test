import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    password:{
        type: String,
    },
    email:{
        type: String,
    },
    admin:{
        type: Boolean,
        default: false,
    },

},{timestamps:true,})

const UserModel = mongoose.model('users',UserSchema)

export default UserModel