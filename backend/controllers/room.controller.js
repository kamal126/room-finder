import Room from "../models/room.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from "../models/user.model.js";


export const getAllRooms = asyncHandler( async(req, res) => {
    const allRooms = await Room.find({});
    return res.status(200).json(
        new ApiResponse(200, allRooms, "Rooms fetched successfully")
    )
})

export const getRoomById = asyncHandler( async(req, res) => {
    const {roomId} = req.params;
    try {
        const room =await Room.findById(roomId)
        if(!room) throw new ApiError(400,"An error occured while fetching the room");

        return res.status(200).json(
            new ApiResponse(200, room, "Room fetched successfully")
        )
    } catch (error) {
        throw new ApiError(400,error.message);
    }
})

export const uploadRoom = asyncHandler( async (req, res) => {
    const {title,description,price,location,city,
        availableFor,type,available,ownerPhone,ownerMail,area,
        beds,baths,balcony,furnished,electricity,constructionAge} = req.body;

    if(!price||!location||!availableFor||!type||!available||!city||
        !ownerPhone||!area||!beds||!baths||!balcony||!furnished||!electricity||!constructionAge)
    throw new ApiError(400, "All fields are required")

    let images = [];
    if (req.files && req.files.length > 0) {
        // Upload images to Cloudinary
        const uploadPromises = req.files.map(async file => {
            const result = await uploadOnCloudinary(file.path);
 
            if (result) {
                images.push(result.secure_url); // Store the Cloudinary URL of the uploaded image
            }
        });

        await Promise.all(uploadPromises); // Wait for all uploads to finish
    }

    const newRoom = await Room.create({
        title,description,price,location,city,availableFor,type,available,
        owner:req.user._id,
        ownerPhone,ownerMail,area,images,beds,baths,balcony,furnished,electricity,constructionAge
    })
    await newRoom.save();

    return res.status(200).json(
        new ApiResponse(200,{newRoom},"Room uploaded successfully")
    )
})

export const getOwnerRoom = asyncHandler( async(req ,res) => {
    const ownerId = req.user._id;
    try {
        const room =await Room.find({owner: ownerId})
        
        return res.status(200).json(
            new ApiResponse(200, room, "Rooms fetched successfully")
        )
    } catch (error) {
        throw new ApiError(400,error.message);
    }
})

export const deleteRoom = asyncHandler( async(req, res) => {
    const {roomId} = req.params;
    //console.log("Roomdelete")
    try {
        await Room.findByIdAndDelete(roomId);
        await User.updateMany(
            { favourites: roomId },
            { $pull: { favourites: roomId } }
        );
        return res.status(200).json(
            new ApiResponse(200, "Room deleted successfully")
        )
    } catch (error) {
        throw new ApiError(400,error.message);
    }
})

export const getSearchedRoom = asyncHandler( async(req, res) => {
    const query = req.query.query;
    const searchWords = query.split(',').map(word => word.trim());
    const searchRegexes = searchWords.map(word => new RegExp(word, 'i')); // 'i' for case-insensitive

    const rooms = await Room.find({
      $or: [
        {
          location: {
            $in: searchRegexes
          }
        },
        ...searchRegexes.map(regex => ({ city: regex }))
      ]
    });

    return res.status(200).json(
        new ApiResponse(200, rooms, "Rooms fetched successfully")
    )
})