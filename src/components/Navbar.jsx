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
    <nav className="p-4 drop-shadow-xl bg-white border-r border-gray-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-[#17458F] text-xl font-semibold hidden sm:block">

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
                className="text-[#17458F] font-bold px-3 py-2 rounded-md text-base"
              >
                Dashboard
              </Link>
            )}
            {user && user.role === 'admin' && (
              <Link
                to="/admindashboard"
                className="text-[#17458F] px-3 py-2 rounded-md text-base font-medium"
              >
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-[#17458F] px-3 py-2 rounded-md text-base font-bold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#17458F] px-3 py-2 rounded-md text-base font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-[#17458F] px-3 py-2 rounded-md text-base font-bold"
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
