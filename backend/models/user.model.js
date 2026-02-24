import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    favourites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'  // Reference to the Room model
    }]
}, {timeseries:true})

const User = mongoose.model("User",UserSchema)

export default User;