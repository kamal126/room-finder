// components/Header.js
import React from 'react';

const RoomHeader = ({ price, location, city }) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold">₹{price}<span className='text-sm font-normal'>/month</span></h2>
      <p className="text-gray-300">{location}, {city}</p>
    </div>
  );
};

export default RoomHeader;