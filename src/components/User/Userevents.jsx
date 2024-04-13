import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Userevents = ({ user }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events', { withCredentials: true });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const navigateToPayment = (event) => {
    navigate('/dashboard/mypayments', { state: { event, user } });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Events</h2>
      <h3 className="text-lg font-semibold mb-2">Welcome {user.first_name}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map(event => (
          <div key={event.id} className="border border-gray-400 rounded-md p-4 mb-4">
            <div><span className="font-semibold">Name:</span> {event.name}</div>
            <p><span className="font-semibold">Location:</span> {event.location}</p>
            <p><span className="font-semibold">Datetime:</span> {formatDate(event.datetime)}</p>
            <p><span className="font-semibold">Description:</span> {event.description}</p>
            <button onClick={() => navigateToPayment(event)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Contribute</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userevents;
