import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import Room from "../models/room.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = asyncHandler( async (req, res) => {

    const {username, email, password, fullName} = req.body;

    console.log(req.body);

        const user = await User.findOne({ $or: [{ username: username }, { email: email }] })
        console.log(req.body);
        console.log("HI");
        if(user) {
            throw new ApiError(400, "User already exist");
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);

        const newUser = new User(
            {username,
            email,
            password: hashedPass,
            fullName}
        )
        if(!newUser) throw new ApiError(400, "Error in generating newUser")
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        return res.status(200).json(
            new ApiResponse(200, {loggedInUser: newUser}, "User account created successfully"))
    }
)
export const login = asyncHandler( async(req, res) => {
    
    const {username, email, password} = req.body;
    if(!username || !email) 
        throw new ApiError(400, "Email and Username are required")

    const user = await User.findOne({ $or: [ {username}, {email}]})
    if(!user)
        throw new ApiError(400, "User doesn't exist")

    const isValidPass = bcryptjs.compare(password, user?.password  || "")
    if(!isValidPass)
        throw new ApiError(400, "Incorrect Password")

    generateTokenAndSetCookie(user._id, res);
    return res.status(201).json(
        new ApiResponse(200, {loggedInUser: user}, "User loggedIn successfully")
    )
})
export const logout = asyncHandler( async(req, res) => {
    console.log("logout called");
    res.cookie("jwt","")
    return res.status(200).json(
        new ApiResponse(200, "User loggedout successfully")
    )
})
export const addRoomToFavourite = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    const {roomId} = req.body;

    const room = await Room.findById(roomId);
    if(!room) throw new ApiError(400,"Room does not exist");

    const user = await User.findById(userId);
    if(!user) throw new ApiError(400,"User not found")

    if(!user.favourites.includes(roomId)) {
        user.favourites.push(roomId);
        await user.save();
    }
    
    return res.status(200).json(
        new ApiResponse(200, {loggedInUser: user}, "User account created successfully"))
})
export const removeFavourite = asyncHandler( async(req, res) => {
    const userId = req.user._id; // Assuming you have user authentication middleware that populates req.user
    const { roomId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) throw new ApiError(400, "Room does not exist");

    const user = await User.findById(userId);
    if (!user) throw new ApiError(400, "User not found");

    if (!user.favourites.includes(roomId)) {
        return res.status(400).json(new ApiResponse(400, null, "Room does not exist in favourites"));
    }

    user.favourites = user.favourites.filter(fav => fav.toString() !== roomId.toString());
    await user.save();

    return res.status(200).json(new ApiResponse(200, {loggedInUser: user}, "Favourite removed successfully"));
})
export const getFavoriteRooms = asyncHandler( async(req, res) => {
    
    const user = await User.findById(req.user._id).exec();

    if (!user) {
        throw new ApiError(400, "User not found");
    }
    const favouriteRoomIds = user.favourites;
    
    if (favouriteRoomIds.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, [], "No rooms in favourites")
        )
    }
    
    // Fetch room details for the favourite room IDs
    const rooms = await Room.find({ _id: { $in: favouriteRoomIds } }).exec();

    return res.status(200).json(
        new ApiResponse(200, rooms, "Rooms fetched successfully")
    )
})