// components/Overview.js
import React from 'react';

const Overview = ({ carpetArea, type, availableFor, status, age, electricity }) => {
  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-4">
      <div className=' w-32 text-sm'>
        <p className="text-gray-500">Carpet Area</p>
        <p>{carpetArea} sqft </p>
      </div>
      <div className=' w-32 text-sm'>
        <p className="text-gray-500">type</p>
        <p>{type}</p>
      </div>
      <div className=' w-32 text-sm'>
        <p className="text-gray-500">Available for</p>
        <p>{availableFor}</p>
      </div>
      <div className=' w-32 text-sm'>
        <p className="text-gray-500">Furnished Status</p>
        <p>{status}</p>
      </div>
      <div className=' w-32 text-sm'>
        <p className="text-gray-500">Age Of Construction</p>
        <p>{age}</p>
      </div>
      <div className=' w-32 text-sm'>
        <p className="text-gray-500">Electricity Bill</p>
        <p>{electricity}</p>
      </div>
    </div>
  );
};

export default Overview;