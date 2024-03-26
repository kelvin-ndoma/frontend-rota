import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'normal' // Set default role to 'normal'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/registrations', {
        user: formData
      }, {
        withCredentials: true // Include withCredentials
      });
      console.log('User registered successfully:', response.data);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error occurred during registration:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="first_name" className="sr-only">First Name</label>
              <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" />
            </div>
            <div>
              <label htmlFor="last_name" className="sr-only">Last Name</label>
              <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="sr-only">Confirm Password</label>
              <input type="password" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
