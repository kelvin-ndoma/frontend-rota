import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Events from './Events';
import Mark from './Mark';
import Register from './Register';
import Payments from './Payments'; // Import the Payments component

const Admindashboard = ({ user }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-48 bg-gray-200 p-4">
        <h3 className="text-xl font-bold mb-4">Menu</h3>
        <ul>
          <li>
            <NavLink
              to="/admindashboard/events"
              activeClassName="font-bold"
              className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-300"
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admindashboard/mark"
              activeClassName="font-bold"
              className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-300"
            >
              Mark
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admindashboard/register"
              activeClassName="font-bold"
              className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-300"
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admindashboard/payments"
              activeClassName="font-bold"
              className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-300"
            >
              Payments
            </NavLink>
          </li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to you Dashbaord {user.first_name}!</h2>
        {/* Nested Routes */}
        <Routes>
          <Route path="/events" element={<Events user={user} />} />
          <Route path="/mark" element={<Mark user={user} />} />
          <Route path="/register" element={<Register user={user} />} />
          <Route path="/payments" element={<Payments user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admindashboard;
