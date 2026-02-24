import React from 'react'
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from 'react';
import RenderAllRooms from '../components/RenderAllRooms';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

const Favourites = () => {

  const [propertyCards, setPropertyCards] = useState([]);
  const {authUser} = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/api/users/getFavoriteRooms` ,
          {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }}
        );
        setPropertyCards(response.data.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }    
    }
    fetchData();
  }, [authUser])

  return (
    <div>
      <h1 className=' mt-4 p-2 font-bold text-2xl text-cyan-950'>Your Favourite Rooms</h1>
      <RenderAllRooms propertyCards={propertyCards} authUser={authUser}/>
    </div>
  )
}

export default Favourites