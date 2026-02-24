import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

const Reviews = () => {
    const {roomId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({ role: 'I own a property here', comment: '', rating: '1'});
    const {authUser} = useAuthContext();

    useEffect(() => {
      async function fetchReviews(){
        const response = await axios.get(`${apiUrl}/api/reviews/${roomId}`);
        //console.log(response.data.data);
        setReviews(response.data.data);
      }
      fetchReviews();
    },[reviews])

    const check = () => {
      if(!authUser) toast.error("Please login to write a review")
      else setShowForm(true);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await axios.post(`https://room-finder-api.vercel.app/api/reviews/add-review/${roomId}`, newReview, 
          {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
          })
        //if(response.status === 200) console.log("Review submitted");
        //console.log(response.data.data);
        setShowForm(false);
        setReviews(response.data.data)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

  return (
    <div className='border border-gray-500 p-4 bg-gray-700 rounded-md w-full lg:w-8/12'>
        <h1 className='font-semibold font-serif text-2xl'>Reviews and Ratings</h1>
        <button className='py-1 bg-black  px-3  mt-4 rounded-md text-white
        transform hover:scale-105 transition duration-300 ease-in-out'
            onClick={() => check()}>
            Write a Review
        </button>
        {showForm && (
            <div className='mt-4'>
            <form onSubmit={handleSubmit}>
              <div className='mb-2 '>
                <label className='block font-semibold'>Role:</label>
                <select id="property-type" name="role" value={newReview.role} onChange={handleInputChange}
                className=" rounded-lg text-sm text-white p-1 bg-slate-800">
                  <option value="I own a property here">I own a property here</option>
                  <option value="I currenlt/used to live here">I currenlt/used to live here</option>
                  <option value="I am a local agent">I am a local agent</option>
                  <option value="I visited the project">I visited the project</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className='mb-2'>
                <label className='block font-semibold'>Comment:</label>
                <textarea
                  name='comment'
                  value={newReview.comment}
                  onChange={handleInputChange}
                  className=' outline-none text-sm text-white p-1 bg-slate-800 p-1 rounded-md w-full'
                  required
                ></textarea>
              </div>
              <div className='mb-2'>
              <label className='block font-semibold'>Rating:</label>
              <select
                name='rating'
                value={newReview.rating}
                onChange={handleInputChange}
                className=' text-sm text-white p-1 bg-slate-800 py-1 px-2 rounded-md w-full'
                required
              >
                <option value=''>Select Rating</option>
                {[...Array(5).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
              <button
                type='submit'
                className='py-1 bg-blue-900 font-medium border border-white px-3 mt-2 rounded-md text-white 
                transform hover:scale-105 transition duration-300 ease-in-out'
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {
          reviews.length > 0 && (
            reviews.map((review) => (
              <div className="shadow-md shadow-gray-400 mt-5 pb-2" key={review._id}>
                <div className='flex gap-4'>
                    <img className='w-12 h-12'
                    src="https://static.thenounproject.com/png/363640-200.png" alt="" />
                    <div>
                        <h2 className='font-semibold block'>{review.userFullName}</h2>
                        <p className='text-sm'>{review.role}</p>
                    </div>
                </div>
                <div className=' mt-3'>
                    <p>
                        {review.comment}
                    </p>
                </div>
              </div>
            ))
          )
        }
    </div>
  )
}

export default Reviews