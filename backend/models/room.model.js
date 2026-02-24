import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    price:{type:String, required:true},
    area:{type:String, required:true},
    location:{type:String, required:true},
    city:{type:String, required:true},
    images:[{type:String, required:true}],
    availableFor:{type:String},
    type:{type:String, required:true},
    available:{type:Boolean, default:true, required:true},
    owner:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User", required:true
    },
    ownerPhone:{type: String,required:true},
    ownerMail:{type:String},
    beds:{type:Number, required:true},
    baths:{type:Number, required:true},
    balcony:{type:Number, required:true},
    furnished:{type:String, required:true},
    constructionAge:{type:String, required:true},
    electricity:{type:String, required:true},
},{timestamps:true})

const Room = mongoose.model("Room", roomSchema);

export default Room;


