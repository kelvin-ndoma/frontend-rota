import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/logout', {
        withCredentials: true
      });
      if (response.status === 200) {
        onLogout();
        navigate('/');
      } else {
        console.error('Logout failed:', response);
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  return (
    <nav className="bg-gray-500 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-semibold hidden sm:block">

              {/* Rotary */}
              {/* Cloudinary image */}
              <a href="https://rotarynairobi.org/" className="img-fluid">
                <img src="https://res.cloudinary.com/dfczhaomn/image/upload/v1707953595/logo_l4i7ev.svg" className="h-12" alt="Rotary Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </a>
            </Link>
          </div>
          <div className="flex space-x-4">
            {user && user.role === 'normal' && (
              <Link
                to="/dashboard"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
            {user && user.role === 'admin' && (
              <Link
                to="/admindashboard"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
