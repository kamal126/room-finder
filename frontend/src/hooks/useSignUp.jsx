import React, { useState } from "react";
import toast from "react-hot-toast";
import { ApiError } from "../../../backend/utils/ApiError";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ username, email, password, fullName }) => {
    const success = handleInputErrors({ username, email, password, fullName });
    if (!success) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${apiUrl}/api/users/signup`,
        { fullName, username, password, email },
        { withCredentials: true },
      );

      const data = res.data.data.loggedInUser;

      localStorage.setItem("room-user", JSON.stringify(data));

      setAuthUser(data);
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignUp;

function handleInputErrors({ username, email, password, fullName }) {
  if (!fullName || !username || !password || !email) {
    toast.error("Please fill in all the details");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be of atleat 6 characters");
    return false;
  }
  return true;
}
