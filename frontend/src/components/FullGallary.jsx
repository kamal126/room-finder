import React from 'react';
import { useLocation } from 'react-router-dom';

const FullGallery = () => {
  const location = useLocation();
  const images = location.state?.images || [];

  return (
    <div className="container mx-auto py-4">
      <div className="grid lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="">
            <img src={image} alt={`Gallery Image ${index + 1}`} className=" w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullGallery;