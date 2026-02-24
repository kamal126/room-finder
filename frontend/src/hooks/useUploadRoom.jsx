import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

const useUploadRoom = () => {

    const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

    const uploadRoom = async({price, location, city, availableFor, type, available, ownerPhone, ownerMail, area,
        beds, baths, balcony, furnished, electricity, constructionAge,images}) => {

        const success = handleInputErrors({price, location, city, availableFor, type, available, ownerPhone, area,
            beds, baths, balcony, furnished, electricity, constructionAge, images});
		if (!success) return;
		setLoading(true);

		const formData = new FormData();

		// Append regular form fields
		formData.append('price', price);
		formData.append('location', location);
		formData.append('city', city);
		formData.append('availableFor', availableFor);
		formData.append('type', type);
		formData.append('available', available);
		formData.append('ownerPhone', ownerPhone);
		formData.append('ownerMail', ownerMail);
		formData.append('area', area);
		formData.append('beds', beds);
		formData.append('baths', baths);
		formData.append('balcony', balcony);
		formData.append('furnished', furnished);
		formData.append('electricity', electricity);
		formData.append('constructionAge', constructionAge);

		// Append images
		images.forEach((image, index) => {
			formData.append('images', image); // Append images with field name 'images'
		});		

		try {
			const response = await axios.post(`${apiUrl}/api/rooms/uploadroom`, 
			formData,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			} );

			//console.log(response.data.data);
			const data = response.data.data;
			if (data.error) {
				throw new ApiError(400, data.error);
			}
			navigate('/my-rooms');
            toast.success("Room uploaded successfully");
		} 
		catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, uploadRoom };
}

export default useUploadRoom;

function handleInputErrors({price, location, city, availableFor, type, available, ownerPhone, area,
    beds, baths, balcony, furnished, electricity, constructionAge,images}) {
		
	if (!price || !location || !city || !availableFor || !type || !available || !ownerPhone || !area ||
            !beds || !baths || !balcony || !furnished || !electricity || !constructionAge || !images) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}