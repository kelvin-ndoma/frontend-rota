import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Routes, Route } from 'react-router-dom';
import Userevents from './Userevents';
import Myattendance from './Myattendance';
import Mypayments from './Mypayments';


const Dashboard = ({ user }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleContribute = (event) => {
    setSelectedEvent(event); // Set the selected event
    navigate('/dashboard/mypayments'); // Navigate to the Payments component
  };
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Reset client-side state if needed
        localStorage.removeItem('user'); // Remove user data from local storage
        window.alert('You are about to log out of your account');
        // Redirect the user to the login page
        window.location.href = '/login';
      } else {
        // Handle errors
        console.error('Failed to logout:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to logout:', error.message);
    }
  };


  return (
    <>
      <div className="flex items-center">
        {/* Hamburger icon for small screens */}
        <button className="grid grid-cols-2 items-center gap-1 sm:hidden fixed top-5 left-5 z-50" onClick={toggleSidebar}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <img src="https://res.cloudinary.com/dfczhaomn/image/upload/v1707953595/logo_l4i7ev.svg" className="h-10 hidden md:block lg:hidden" alt="Rotary Logo" />
        </button>
      </div>


      <div className="flex">
        {/* Sidebar */}
        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isOpen ? '' : '-translate-x-full'} bg-white border-r border-gray-300 shadow-2xl sm:translate-x-0 sm:static sm:h-auto sm:pt-0`} aria-label="Sidebar">
          <div className="h-screen px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium">
              {/* dashboard */}
              <li>
                <NavLink
                  to="/dashboard/userevents"
                  activeClassName="font-bold"
                  className="flex items-center p-2 hover:bg-gray-100 group"
                >
                  <svg className="w-5 h-5 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Events</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myattendance"
                  activeClassName="font-bold"
                  className="flex items-center p-2 rounded-lg group"
                >
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-600 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">My Attendance</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/mypayments"
                  activeClassName="font-bold"
                  className="flex items-center p-2 rounded-lg group"
                >
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-600 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Payments</span>
                </NavLink>
              </li>
              {/* logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 rounded-lg group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-blue-600 transition duration-75"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </aside >

        {/* Main Content */}
        < div className="flex-1 p-4" >
          <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard {user.first_name}!</h2>
          {/* Nested Routes */}
          <Routes>
          <Route
          path="/userevents"
          element={<Userevents user={user} handleContribute={handleContribute} />}
        />
            <Route path="/myattendance" element={<Myattendance user={user} />} />
            <Route
          path="/mypayments"
          element={<Mypayments user={user} selectedEvent={selectedEvent} />}
        />

          </Routes>
        </div >
      </div >
    </>
  );
};

export default Dashboard;
