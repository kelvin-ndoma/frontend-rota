import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    datetime: '',
    description: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);

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

  const isAdmin = user && user.role === 'admin';

  const createEvent = async () => {
    try {
      await axios.post('http://localhost:3000/events', newEvent, { withCredentials: true });
      setNewEvent({
        name: '',
        location: '',
        datetime: '',
        description: ''
      });
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3000/events/${eventId}`, { withCredentials: true });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const updateEvent = async (eventId, updatedFields) => {
    try {
      await axios.patch(`http://localhost:3000/events/${eventId}`, { event: updatedFields }, { withCredentials: true });
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleUpdateClick = (event) => {
    setEditingEvent(event);
    setNewEvent(event); // Set the form fields to the current event's details
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setNewEvent({
      name: '',
      location: '',
      datetime: '',
      description: ''
    });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Events</h2>
      {isAdmin && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Create New Event</h3>
          <form onSubmit={(e) => { e.preventDefault(); createEvent(); }} className="flex flex-col">
            <input type="text" value={newEvent.name} placeholder="Name" onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
            <input type="text" value={newEvent.location} placeholder="Location" onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
            <input type="datetime-local" value={newEvent.datetime} onChange={(e) => setNewEvent({ ...newEvent, datetime: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
            <textarea value={newEvent.description} placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2"></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Event</button>
          </form>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">Events List</h3>
      <ul>
        {events.map(event => (
          <li key={event.id} className="border border-gray-400 rounded-md p-4 mb-4">
            <div><span className="font-semibold">Name:</span> {event.name}</div>
            <div><span className="font-semibold">Location:</span> {event.location}</div>
            <div><span className="font-semibold">Datetime:</span> {event.datetime}</div>
            <div><span className="font-semibold">Description:</span> {event.description}</div>
            {isAdmin && (
              <div className="mt-2">
                <button onClick={() => deleteEvent(event.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Delete</button>
                <button onClick={() => handleUpdateClick(event)} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {editingEvent && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Edit Event</h3>
          <form onSubmit={(e) => { e.preventDefault(); updateEvent(editingEvent.id, newEvent); handleCancelEdit(); }} className="flex flex-col">
            <input type="text" value={newEvent.name} placeholder="Name" onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
            <input type="text" value={newEvent.location} placeholder="Location" onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
            <input type="datetime-local" value={newEvent.datetime} onChange={(e) => setNewEvent({ ...newEvent, datetime: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
            <textarea value={newEvent.description} placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2"></textarea>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Save</button>
            <button onClick={handleCancelEdit} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Events;
