import React from 'react'
import PropertyCard from './PropertyCard'
import { Link } from 'react-router-dom'


const RenderAllRooms = ({ propertyCards = [], authUser }) => {
  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 pl-2 pr-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {propertyCards.length > 0 &&
          propertyCards.map((card) => (
            <Link key={card._id} to={`/room/${card._id}`}>
              <PropertyCard
                {...card}
                initialFavourite={
                  authUser?.loggedInUser?.favourites?.includes(card._id) || false
                }
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RenderAllRooms;