import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

const PropertyCard = ({ type, price, area, location, availableFor, images, _id, initialFavourite }) => {

    const {authUser, setAuthUser}= useAuthContext();
    //console.log("isFavourite ",initialFavourite)
    const [isFavourite, setIsFavourite] = useState(initialFavourite);
    const toggleFavorite = async (e) => {
        e.preventDefault();
        //console.log(_id);
        try {
          if (!isFavourite) {
            const res = await axios.post(`${apiUrl}/api/users/addRoomToFavorite`, { roomId: _id },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
            });
            toast.success("Room added into the favorites")
            const user = res.data.data;
            //console.log("user ",user);
            setAuthUser(user);
            localStorage.setItem("room-user", JSON.stringify(user));
            setIsFavourite(true)
          } 
          else {
            //console.log("Else part in toggling favourite")
            const res = await axios.post(`${apiUrl}/api/users/removeFavorite`,{ roomId: _id },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Room removed from the favorites")
            setAuthUser(res.data.data);
            localStorage.setItem("room-user", JSON.stringify(res.data.data));
            //console.log("user ",res.data.data);
            setIsFavourite(false)
          }
        } 
        catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error("Error in toggling favourite")
        }
    };

    return(
        <div className=" max-w-[420px] w-full bg-white rounded overflow-hidden shadow-lg 
        transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
            <img className="w-full h-60" src={images[0]} alt={type} />
            <div className="px-6 py-4 h-40">
                <div className=" flex justify-between text-xl mb-2">
                {type}
                {authUser && <button onClick={toggleFavorite}
                    className=" text-xs bg-purple-300 px-2 font-serif py-1 rounded-xl hover:bg-purple-900 hover:text-white
                        transform hover:scale-105 transition duration-300 ease-in-out">
                    {!isFavourite ? 'AddToFavorite' : 'RemoveFavorite'}
                </button>}
                </div>
                <p className="text-gray-700 text-base">₹{price}  |  {area} sq.ft</p>
                <p className="text-gray-700 text-base font-semibold">{location}</p>
                <p className="text-gray-700 text-base">Available for {availableFor}</p>
            </div>
        </div>
    )
};

export default PropertyCard;