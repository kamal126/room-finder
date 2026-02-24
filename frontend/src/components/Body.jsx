import React, { useEffect, useState } from 'react';
import axios from 'axios'
import RenderAllRooms from './RenderAllRooms';
import { useAuthContext } from "../context/AuthContext";
import { useLocation } from 'react-router-dom';
// const PropertyCards = [
//   {
//     id: 8,
//     type: '1 BHK Flat',
//     rent: '₹10,000',
//     area: '400 sqft',
//     location: 'Vijay Nagar, Indore',
//     availableFor: 'Girls',
//     imgSrc: 'room.jpg',
//   },
// ];

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

const Body = () => {

  const [propertyCards, setPropertyCards] = useState([]);
  const {authUser} = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    console.log("authUser-> ",authUser);
    async function fetchData() {
      try {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('search') || '';
        
        const endpoint = searchQuery 
          ? `${apiUrl}/api/rooms/search?query=${searchQuery}` 
          : `${apiUrl}/api/rooms`;

        const response =await axios.get(endpoint);
        //console.log("response",response.data.data);
        setPropertyCards(response.data.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [authUser, location.search])

  return (
  <div className=' '>
    <RenderAllRooms propertyCards={propertyCards} authUser={authUser}/>
  </div>
);
}

export default Body;