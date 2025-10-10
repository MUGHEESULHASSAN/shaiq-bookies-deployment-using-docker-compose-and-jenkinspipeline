import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = ({ onCancel }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  // Backend URL from .env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const togglePasswordVisibility = () => {
    const input = passwordInputRef.current;
    input.type = input.type === "password" ? "text" : "password";
    setShowPassword(!showPassword);
  };

  const onAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${backendUrl}/users/admin-login`, // ✅ use backend URL env variable
        { password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.logged) {
        onCancel();
        return navigate("/admin-dashboard");
      }

      setError(res.data.message);
      setTimeout(() => setError(""), 3000);
    } catch (error) {
      console.error(error);
      setError("An error occurred while logging in.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <form
      className="w-full mt-4 flex flex-col gap-5 justify-center items-center mx-auto"
      onSubmit={onAdminLogin}
    >
      <div className="relative w-3/4">
        <input
          className="bg-white w-full text-black rounded-md shadow-lg border-b border-gray-500 p-2"
          ref={passwordInputRef}
          type="password"
          placeholder="Secret-key"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!showPassword ? (
          <FaEye
            className="absolute dark:text-black right-2 top-3 hover:cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FaEyeSlash
            className="absolute dark:text-black right-2 top-3 hover:cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="block w-3/4 bg-primary-red text-white text-xl font-semibold text-center py-3 px-6 rounded-xl hover:bg-red-600 hover:cursor-pointer transition-all duration-300"
        type="submit"
        value="Log In"
      />
    </form>
  );
};

export default AdminLoginForm;
