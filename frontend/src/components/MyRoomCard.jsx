import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

const MyRoomCard = ({ type, price, area, location, availableFor, images, _id, setRefresh }) => {

  async function handleDelete(e){
    e.preventDefault();
    console.log("response");
    try {
      const response = await axios.get(`${apiUrl}/api/rooms/deleteRoom/${_id}`)
      //console.log("response");
      if(response.status === 200) 
      {
        toast.success("Room deleted successfully");
        setRefresh(prev => !prev);
      }

    } catch (error) {
      console.log("error in deleting room -> ",error.message);
      toast.error("Error in deleting room");
    }
  }
  return (
    <div className="max-w-[420px] w-full rounded bg-white overflow-hidden shadow-lg
        transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
            <img className="w-full h-60" src={images[0]} alt={type} />
            <div className="px-6 py-4 h-40">
                <div className=" flex justify-between text-xl mb-2">
                    {type}
                    
                    <Button variant="outlined" size='small' startIcon={<DeleteIcon />} onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
                <div className='flex justify-between'>
                  <p className="text-gray-700 text-base">₹{price}  |  {area}</p>
                  <button 
                        className=" text-xs bg-purple-300 px-2 font-serif py-1 rounded-xl
                        transform hover:scale-105 transition duration-300 ease-in-out hover:bg-purple-900 hover:text-white">
                        Edit
                    </button>
                  {/* <button onClick={handleDelete}
                          className=" text-xs bg-slate-700 text-white px-2 font-serif py-1 rounded-sm ">
                          Delete
                  </button> */}
                </div>
                <p className="text-gray-700 text-base font-semibold">{location}</p>
                <p className="text-gray-700 text-base">Available for {availableFor}</p>
            </div>
    </div>
  )
}

export default MyRoomCard