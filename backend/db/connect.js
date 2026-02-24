import mongoose from "mongoose";

export const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("MOngoDB connected"));
    } catch (err) {
        console.log("Error in connecting mongodb -> ", err.message);
        process.exit(1);
    }
}

