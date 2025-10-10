import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import LoginModel from "./LoginModel";
import ConfirmLogout from "./ConfirmLogout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // Backend URL from .env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await axios.get(`${backendUrl}/users/authenticate`, {
          withCredentials: true,
        });
        if (res.data.isAuthenticated) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        setLoggedIn(false);
      }
    };

    authenticate();
  }, [backendUrl]);

  const handleClick = () => {
    setShowLoginModel(true);
  };

  const onCancel = () => {
    setShowLoginModel(false);
  };
  const onCancelLogout = () => {
    setShowLogout(false);
  };

  const handleLogoutClick = () => {
    setShowLogout(true);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.loggedOut) {
        onCancelLogout();
        setLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="text-gray-600 bg-white dark:bg-slate-900 dark:text-white body-font shadow-lg">
      <div className="container mx-auto flex flex-wrap px-5 py-4 flex-col md:flex-row justify-between items-center">
        <NavLink
          to="/"
          className="flex title-font font-medium items-center ml-5 mb-4 md:mb-0"
        >
          <FaBookOpen className="text-2xl text-primary-red" />
          <span className="ml-3 text-primary-red text-2xl">Bookies</span>
        </NavLink>
        <div className="flex flex-col items-center md:flex-row md:gap-72">
          <nav className="md:ml-auto mr-8 flex gap-10 flex-wrap items-center text-base justify-center">
            {["/", "/books", "/contact", "/about"].map((path, idx) => {
              const names = ["Home", "Books", "Contact", "About"];
              return (
                <NavLink
                  key={idx}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "relative after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-primary-red"
                      : "hover:border-b-2 hover:border-primary-red transition-all duration-300"
                  }
                >
                  {names[idx]}
                </NavLink>
              );
            })}
          </nav>
          <div className="flex gap-2 justify-center items-center">
            <label className="swap swap-rotate mt-4 md:mt-0">
              <input
                type="checkbox"
                className="theme-controller"
                value="dark"
              />
              <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
              <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </label>
            <button
              onClick={loggedIn ? handleLogoutClick : handleClick}
              className="inline-flex items-center bg-primary-red text-white py-2 px-4 focus:outline-none hover:bg-red-600 rounded-md text-base mt-4 md:mt-0 transition-all duration-300"
            >
              {loggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </div>
        <LoginModel show={showLoginModel} onCancel={onCancel} />
        <ConfirmLogout
          show={showLogout}
          onClose={onCancelLogout}
          onConfirm={handleLogout}
        />
      </div>
    </header>
  );
};

export default Navbar;
