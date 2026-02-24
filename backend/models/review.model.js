import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    userFullName:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        reuired:true,
    },
    comment:{
        type:String,
        required:true,
    },
}, {timestamps:true});

const Review = mongoose.model("Review", reviewSchema);

export default Review;