import { asyncHandler } from "../utils/asyncHandler.js";
import Review from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const getReviewsForRoom = asyncHandler( async(req, res) => {
    const {roomId} = req.params;
    const reviews = await Review.find({room: roomId})
    if(!reviews)
    throw new ApiError(404, "No reviews found for this room")
    return res.status(200).json(
        new ApiResponse(200, reviews, "Reviews fetched successfully")
    )
})

export const addReview = asyncHandler( async(req, res) => {
    const {roomId} = req.params;
    const {role, rating, comment} = req.body;
    const userId = req.user._id;
    
    //console.log("role ",role, "rating", rating, "comment",comment);

    if(!role || !rating || !comment)
    throw new ApiError(400,"All fields are required");

    const newReview = await Review.create({
        room: roomId,
        user: userId,
        userFullName: req.user.fullName,
        role,
        comment,
        rating
    })
    /*console.log("newreview ",newReview);*/
    await newReview.save();
    return res.status(200).json(
        new ApiResponse(200, newReview, "Review added successfully")
    )
})