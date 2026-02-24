import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';
import "../../public/CSS/header.css";
import { Button } from '@mui/material';


const Header = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const {authUser}= useAuthContext();
  const { loading, logout } = useLogout();


  const fetchSuggestions = async (input) => {
    const apiKey = import.meta.env.VITE_GEOAPIFY_PLACES_API_KEY;
    
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
        params: {
          text: input,
          apiKey: apiKey,
        },
      });
      setSuggestions(response.data.features);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearch = () => {
    // Implement search functionality here based on the query
    //console.log('Searching for:', query);
    // For example, you can navigate to a search results page passing the query as a parameter
    navigate(`/?search=${encodeURIComponent(query)}`);
    setQuery('');
    setSuggestions([]);
  };

  const handleChange = (event) => {
    const input = event.target.value;
    //console.log(input.length);
    setQuery(input);
    if (input.length > 2) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      handleSearch();
    }
  };
  const handleSuggestionClick = (suggestion) => {
    // Set the query state and then trigger the search
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="items-center justify-between p-1 sm:flex">
      
        <div className='flex gap-1'>
          {/*<h1 className="text-xl md:text-3xl font-semibold">RoomFinder</h1>*/}
          <img className='w-7 h-7 sm:w-10 sm:h-10 md:w-16 md:h-16 inline hover:cursor-pointer
          transform hover:scale-105 transition duration-300 ease-in-out' src='/room-icon.svg' alt="Room Finder Icon"
            onClick={() => navigate("/")}/>
        </div>
        <div className="w-60 my-2 lg:w-96">
          <input 
            type="text" 
            placeholder="Search for location"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyPress} // Handle Enter key press
            className="border border-gray-800 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:p-2 px-1 rounded-full 
            w-full placeholder-gray-500 transition duration-200 ease-in-out transform hover:scale-105"
            //className="border border-gray-500 bg-slate-100 md:p-2 px-1 rounded-3xl w-full" 
          />
          {suggestions.length > 0 && (
            <ul className="absolute bg-slate-100 border border-gray-500 rounded-3xl mt-1 w-72 lg:w-96 max-h-60 overflow-y-auto z-10">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() =>  handleSuggestionClick(suggestion.properties.formatted)}>
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
      
      <div className="flex items-center space-x-3">
          <img className='md:w-8 md:h-8 w-6 h-6 inline hover:cursor-pointer
          hover:scale-110 hover:shadow-lg transition-transform duration-200 ease-in-out'
           src="https://cdn-icons-png.flaticon.com/512/985/985709.png" alt="User Icon"
           onClick={!authUser ? ()=>navigate('/login') : ()=>navigate('/favourites')}
           />
          <button onClick={!authUser ? ()=>navigate('/login') : ()=>navigate('/my-rooms')}
           className=' md:px-4 md:py-2 px-1 border bg-zinc-700
           text-white md:font-medium hover:bg-gray-300 hover:text-black hover:shadow-lg rounded-full
           transform hover:scale-105 transition duration-300 ease-in-out'>MY ROOMS</button>
          <button onClick={!authUser ? ()=>navigate('/login') : ()=>logout()} 
            className="bg-sky-600 text-white md:px-4 md:py-2 md:font-medium px-1 rounded
              transform hover:scale-105 transition duration-300 ease-in-out hover:bg-sky-900">
              {authUser ? "LOGOUT" : "LOGIN"}
          </button>    
      </div>
    </div>
  );
};

export default Header;