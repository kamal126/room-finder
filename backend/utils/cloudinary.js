import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (loaclFilePath) => {
    try {
        if(!loaclFilePath) return null;

        const response = await cloudinary.uploader.upload(loaclFilePath,{
            resource_type:"auto"
        });

        fs.unlinkSync(loaclFilePath);
        return response;
    } catch (error) {
        console.log("Error in cloudinary,js", error.message);
        fs.unlinkSync(loaclFilePath)
        return null;
    }
}




