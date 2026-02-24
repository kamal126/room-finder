import React, { useState } from 'react'
import useUploadRoom from '../hooks/useUploadRoom'


const UploadRoom = () => {

  const [inputs, setInputs] = useState({
    price:'', location:'', city:'', availableFor:'', type:'', available:'', ownerPhone:'', ownerMail:'', 
    area:'', beds:'1', baths:'1', balcony:'0', furnished:'', electricity:'', constructionAge:'',images:[]
  })
  const {loading, uploadRoom} = useUploadRoom();

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    await uploadRoom(inputs);
  }
  return (
    <div className='p-4 w-auto ml-10 h-full '>
      <h1 className=' font-semibold mb-6 text-blue-950 text-2xl'>Rent your Property</h1>
      <form>
        <div className="flex flex-col text-sm w-64">
        <label htmlFor="property-type" className="mb-1 font-medium text-gray-700">Property Type:</label>
        <select id="property-type" name="property-type" className="border border-gray-300 rounded-lg bg-white"
         value={inputs.type}
         onChange={(e)=>setInputs({...inputs, type:e.target.value})}>
          <option value="">Select Property Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="1BK">1BK</option>
          <option value="Studio">Studio</option>
        </select>
        </div>

        <div className=' mt-10 flex flex-col'>
            <h1 className=' font-medium'>Property Location</h1>
            <div className=' flex flex-col gap-1 mt-2 text-sm'>
                <label htmlFor="city">City</label>
                <input className=' outline-none border-none border-b'
                value={inputs.city}
                onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
                placeholder='Enter city' type="text" />
                <div className=' border-b'></div>
            </div>
            <div className=' flex flex-col gap-1 mt-2 text-sm'>
                <label htmlFor="location">Locality</label>
                <input className=' outline-none border-none border-b'
                value={inputs.location}
                onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                placeholder='Enter locality' type="text" />
                <div className=' border-b'></div>
            </div>
        </div>
        {/* propert-features */}
        <div className=' mt-10 flex flex-col'>
            <h1 className=' font-medium'>Property Features</h1>
            <div className='flex text-sm gap-4 w-64 mt-4'>
              <label htmlFor="beds" className="mb-1 text-sm text-gray-700">Bedrooms:</label>
              <select id="beds"
              value={inputs.beds}
              onChange={(e) => setInputs({ ...inputs, beds: e.target.value })}
              className="border border-gray-300 outline-none rounded-lg bg-white">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <label htmlFor="baths" className="mb-1 text-sm text-gray-700">Bathrooms:</label>
              <select id="baths" name="baths"
              value={inputs.baths}
              onChange={(e) => setInputs({ ...inputs, baths: e.target.value})}
               className="border border-gray-300 outline-none rounded-lg bg-white">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <label htmlFor="balcony" className="mb-1 text-sm text-gray-700">Balconies:</label>
              <select id="balcony" name="balcony" 
              value={inputs.balcony}
              onChange={(e) => setInputs({ ...inputs, balcony: e.target.value})}
              className="border border-gray-300 outline-none rounded-lg bg-white">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mt-4 font-bold mb-2">
                Furnished Status
              </label>
                <div className="flex text-sm space-x-4">
                <div>
                <input
                  type="radio"
                  id="furnished"
                  name="furnished"
                  value="Furnished"
                  checked={inputs.furnished === 'Furnished'}
                  onChange={(e) => setInputs({ ...inputs, furnished: e.target.value })}
                  className="mr-2 leading-tight"
                />
                <label htmlFor="furnished" className="text-gray-700">
                  Furnished
                </label>
                </div>
                <div>
                <input
                  type="radio"
                  id="unfurnished"
                  name="furnished"
                  value="Unfurnished"
                  checked={inputs.furnished === 'Unfurnished'}
                  onChange={(e) => setInputs({ ...inputs, furnished: e.target.value })}
                  className="mr-2 leading-tight"
                />
                <label htmlFor="unfurnished" className="text-gray-700">
                  Unfurnished
                </label>
                </div>
                <div>
                <input
                  type="radio"
                  id="semi-furnished"
                  name="furnished"
                  value="Semi-furnished"
                  checked={inputs.furnished === 'Semi-furnished'}
                  onChange={(e) => setInputs({ ...inputs, furnished: e.target.value })}
                  className="mr-2 leading-tight"
                />
                <label htmlFor="semi-furnished" className="text-gray-700">
                  Semi-furnished
                </label>
              </div>
            </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mt-4 font-bold mb-2">
                Electricity Bill
              </label>
              <div className="flex text-sm space-x-4">
                <div>
                  <input
                    type="radio"
                    id="included"
                    name="electricity"
                    value="Included"
                    checked={inputs.electricity === 'Included'}
                    onChange={(e) => setInputs({ ...inputs, electricity: e.target.value })}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="included" className="text-gray-700">
                    Included
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="excluded"
                    name="electricity"
                    value="Excluded"
                    checked={inputs.electricity === 'Excluded'}
                    onChange={(e) => setInputs({ ...inputs, electricity: e.target.value })}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="excluded" className="text-gray-700">
                    Excluded
                  </label>
                </div>
              </div>
            </div>
            {/* constructionAge */}
            <div>
              <label className='flex flex-col gap-1 mb-1 mt-4 text-sm font-bold text-gray-700' htmlFor="constructionAge">Age of Construction</label>
              <input
                className='outline-none w-full border-none border-b text-sm'
                placeholder='In years'
                type="text"
                id="constructionAge"
                name="constructionAge"
                value={inputs.constructionAge}
                onChange={(e) => setInputs({ ...inputs, constructionAge: e.target.value })}
              />
              <div className=' border-b'></div>
            </div>
            {/* area */}
            <div>
              <label className='flex flex-col gap-1 mb-1 mt-4 text-sm font-bold text-gray-700' htmlFor="area">Covered Area:</label>
              <input
                className='outline-none text-sm w-full border-none border-b'
                placeholder='Covered Area in sq.ft'
                type="String"
                id="area"
                name="area"
                value={inputs.area}
                onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
              />
              <div className='border-b'></div>
            </div> 
        </div>
        {/* Availability */}
        <div className='mt-10 flex flex-col'>
          <h1 className='font-medium'>Availability</h1>
          <label className='text-gray-700 text-sm mt-4 font-bold mb-1' htmlFor="availableFor">Available for</label>
          <div className="flex text-sm space-x-4">
            <div>
              <input
                type="radio"
                id="Girls"
                name="availableFor"
                value="Girls"
                checked={inputs.availableFor === 'Girls'}
                onChange={(e) => setInputs({ ...inputs, availableFor: e.target.value })}
                className="mr-2 leading-tight"
              />
              <label htmlFor="Girls" className="text-gray-700">
                Girls
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Boys"
                name="availableFor"
                value="Boys"
                checked={inputs.availableFor === 'Boys'}
                onChange={(e) => setInputs({ ...inputs, availableFor: e.target.value })}
                className="mr-2 leading-tight"
              />
              <label htmlFor="Boys" className="text-gray-700">
                Boys
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Family"
                name="availableFor"
                value="Family"
                checked={inputs.availableFor === 'Family'}
                onChange={(e) => setInputs({ ...inputs, availableFor: e.target.value })}
                className="mr-2 leading-tight"
              />
              <label htmlFor="Family" className="text-gray-700">
                Family
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Anyone"
                name="availableFor"
                value="Anyone"
                checked={inputs.availableFor === 'Anyone'}
                onChange={(e) => setInputs({ ...inputs, availableFor: e.target.value })}
                className="mr-2 leading-tight"
              />
              <label htmlFor="Anyone" className="text-gray-700">
                Anyone
              </label>
            </div>
          </div>
  
          <label className='text-gray-700 text-sm mt-4 font-bold mb-1' htmlFor="available">Available</label>
          <div className="flex text-sm space-x-4">
            <div>
              <input
                type="radio"
                id="true"
                name="available"
                value="true"
                checked={inputs.available === 'true'}
                onChange={(e) => setInputs({ ...inputs, available: e.target.value })}
                className="mr-2 leading-tight"
              />
              <label htmlFor="true" className="text-gray-700">
                true
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="false"
                name="available"
                value="false"
                checked={inputs.available === 'false'}
                onChange={(e) => setInputs({ ...inputs, available: e.target.value })}
                className="mr-2 leading-tight"
              />
              <label htmlFor="false" className="text-gray-700">
                false
              </label>
            </div>
          </div>
        </div>
        {/* price */}
        <div className='mt-10 flex flex-col'>
          <h1 className='font-medium'>Price Details</h1>
          <label className='text-gray-700 text-sm mt-4 font-bold mb-1' htmlFor="price">Expected Price</label>
          <input 
            className='outline-none w-full border-none border-b text-sm'
            placeholder='per month'
            type="text"
            value={inputs.price}
            onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          />
          <div className='border-b'></div>
        </div>
        {/* contact */}
        <div className='mt-10 flex flex-col'>
          <h1 className='font-medium'>Contact Details</h1>
          <label className='text-gray-700 text-sm mt-4 font-bold mb-1' htmlFor="contact">Contact number</label>
          <input 
            className='outline-none border-none border-b text-sm'
            placeholder='Enter your contact number'
            type="text"
            value={inputs.ownerPhone}
            onChange={(e) => setInputs({ ...inputs, ownerPhone: e.target.value })}
          />
          <div className='border-b'></div>
          <label className='text-gray-700 text-sm mt-4 font-bold mb-1' htmlFor="email">Email</label>
          <input 
            className='outline-none border-none border-b text-sm'
            placeholder='Enter your Email'
            type="text"
            value={inputs.ownerMail}
            onChange={(e) => setInputs({ ...inputs, ownerMail: e.target.value })}
          />
          <div className='border-b'></div>
        </div>

        <div className='mt-10 flex flex-col mb-10'>
          <h1 className='font-medium'>Upload Images</h1>
          <input
            type='file'
            multiple
            className='mt-3 rounded-sm text-sm'
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setInputs(prevState => ({
                ...prevState,
                images: [...prevState.images, ...files]
              }));
            }}
          />
        </div>
        
        <button onClick={handleFormSubmit}
           className=' px-3 py-2 mb-2 rounded-md mt-2 font-serif bg-gray-400'>
            Upload Room
          </button>
      </form>
    </div>
  )
}

export default UploadRoom