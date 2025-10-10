import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const navigate = useNavigate();

  // Use backend URL from .env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const togglePasswordVisibility = () => {
    const input = passwordInputRef.current;
    input.type = input.type === "password" ? "text" : "password";
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    const input = confirmPasswordInputRef.current;
    input.type = input.type === "password" ? "text" : "password";
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onRegister = async (e) => {
    e.preventDefault();

    if (username.length < 5 || username.length > 50) {
      setError("Username must be between 5 and 50 characters long");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (password.length < 8 || password.length > 30) {
      setError("Password must be between 8 and 30 characters long");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/users/register`,
        { email, username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.registered) {
        onCancel();
        return navigate("/");
      }

      setError(res.data.message);
      setTimeout(() => setError(""), 3000);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <form
      className="w-full mt-4 flex flex-col gap-5 justify-center items-center mx-auto"
      onSubmit={onRegister}
    >
      <input
        className="bg-white text-black w-3/4 rounded-md shadow-lg border-b border-gray-500 p-2"
        type="text"
        placeholder="email"
        name="email"
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="bg-white text-black w-3/4 rounded-md shadow-lg border-b border-gray-500 p-2"
        type="text"
        placeholder="username"
        name="username"
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="password relative w-3/4">
        <input
          className="bg-white w-full text-black rounded-md shadow-lg border-b border-gray-500 p-2"
          ref={passwordInputRef}
          type="password"
          placeholder="password"
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
      <div className="confirm-password relative w-3/4">
        <input
          className="bg-white w-full text-black rounded-md shadow-lg border-b border-gray-500 p-2"
          ref={confirmPasswordInputRef}
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!showConfirmPassword ? (
          <FaEye
            className="absolute dark:text-black right-2 top-3 hover:cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          />
        ) : (
          <FaEyeSlash
            className="absolute dark:text-black right-2 top-3 hover:cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          />
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="block w-3/4 bg-primary-red text-white text-xl font-semibold text-center py-3 px-6 rounded-xl hover:bg-red-600 hover:cursor-pointer transition-all duration-300"
        type="submit"
        value="Sign Up"
      />
    </form>
  );
};

export default RegisterForm;
