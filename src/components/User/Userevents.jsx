import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Userevents = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserEvents();
  }, [user]);

  const fetchUserEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${user.id}/events`, { withCredentials: true });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching user events:', error);
      setError(error.message || 'An error occurred while fetching user events');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">User Events</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {events.map(event => (
          <li key={event.id} className="border border-gray-400 rounded-md p-4 mb-4">
            <div><span className="font-semibold">Name:</span> {event.name}</div>
            <div><span className="font-semibold">Location:</span> {event.location}</div>
            <div><span className="font-semibold">Datetime:</span> {event.datetime}</div>
            <div><span className="font-semibold">Description:</span> {event.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Userevents;
