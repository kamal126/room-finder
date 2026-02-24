// components/Actions.js
import React, { useState } from 'react';

const Actions = ({phone, email, available}) => {

  const [showContact, setShowContact] = useState(false);

  return (
    <div className="sm:flex justify-start gap-4 items-center mb-4">
      <button className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-white
      transform hover:scale-105 transition duration-300 ease-in-out">{available ? "Available now":"Unavailable"}</button>
      <button onClick={() => setShowContact(!showContact)}
        className="bg-red-500 text-white lg:py-2 lg:px-4 p-2 mt-1 rounded hover:bg-red-700
        transform hover:scale-105 transition duration-300 ease-in-out">Contact Owner
      </button>
      {showContact && 
        <div className=' font-serif text-sm p-2 rounded-sm'>
          <p>{phone}</p>
          {email && <p>{email}</p>}
        </div>
      }
    </div>
  );
};

export default Actions;