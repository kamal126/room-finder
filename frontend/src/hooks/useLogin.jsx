import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { ApiError } from "../../../backend/utils/ApiError";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_ENDPOINT;
const useLogin = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async ({username, email, password}) => {
		const success = handleInputErrors({username, email, password});
		if (!success) return;
		setLoading(true);
		try {
			const response = await axios.post(`${apiUrl}/api/users/login`, {
                username,
                email,
                password
            }, 
			{
				headers: {
				  'Content-Type': 'application/json'
				},
                withCredentials: true
			}
            );
			//console.log(response.data.data);
			const data = response.data.data;
			if (data.error) {
				throw new ApiError(400, data.error);
			}

			localStorage.setItem("room-user", JSON.stringify(data));
			setAuthUser(data);
			navigate('/');
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors({username, email, password}) {
	if (!username || !email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}