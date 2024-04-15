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
        <>
            <div className="">
                <div className="mt-4">
                    <h2 className="text-xl text-[#F7A81B] font-bold mb-4 px-4">Events</h2>
                    <div className="flex flex-wrap justify-start gap-4">
                        {/* create event */}
                        <div className="w-full lg:w-1/3 p-4 drop-shadow-2xl bg-white rounded-lg">
                            {isAdmin && (
                                <div className="mb-4 overflow-hidden">
                                    <h3 className="text-[#17458F] text-base font-bold mb-2">Create New Event</h3>
                                    <form onSubmit={(e) => { e.preventDefault(); createEvent(); }} className="flex flex-col">
                                        <input type="text" value={newEvent.name} placeholder="Name" onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
                                        <input type="text" value={newEvent.location} placeholder="Location" onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
                                        <input type="datetime-local" value={newEvent.datetime} onChange={(e) => setNewEvent({ ...newEvent, datetime: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
                                        <textarea value={newEvent.description} placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2"></textarea>
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 font-semibold text-white px-4 py-2 rounded-md w-full">Create Event</button>
                                    </form>
                                </div>
                            )}
                        </div>
                        {/* editing an event */}
                        <div className="w-full lg:w-1/2 p-4 drop-shadow-2xl bg-white rounded-lg">
                            <h3 className="text-[red] text-base font-bold mb-2">Edit Event</h3>
                            {editingEvent && (
                                <div className="mb-4">
                                    <form onSubmit={(e) => { e.preventDefault(); updateEvent(editingEvent.id, newEvent); handleCancelEdit(); }} className="flex flex-col">
                                        <input type="text" value={newEvent.name} placeholder="Name" onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
                                        <input type="text" value={newEvent.location} placeholder="Location" onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
                                        <input type="datetime-local" value={newEvent.datetime} onChange={(e) => setNewEvent({ ...newEvent, datetime: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2" />
                                        <textarea value={newEvent.description} placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2 mb-2"></textarea>
                                        <div className="mt-2 flex">
                                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Save</button>
                                            <button onClick={handleCancelEdit} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* events list */}
                    <div className="flex flex-wrap justify-start mt-8">
                        <div className="w-full p-4 drop-shadow-2xl rounded-lg bg-white overflow-hidden">
                            <h3 className="text-[#17458F] text-base font-bold mb-2">Events List</h3>
                            <div className="overflow-x-auto">
                                <table className='table-auto border-collapse border border-gray-300'>
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-2">Name</th>
                                            <th className="border border-gray-300 px-4 py-2">Location</th>
                                            <th className="border border-gray-300 px-4 py-2">Date</th>
                                            <th className="border border-gray-300 px-4 py-2">Description</th>
                                            <th className="border border-gray-300 px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map(event => (
                                            <tr key={event.id}>
                                                <td className="border border-gray-300 px-4 py-2">{event.name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{event.location}</td>
                                                <td className="border border-gray-300 px-4 py-2">{event.datetime}</td>
                                                <td className="border border-gray-300 px-4 py-2">{event.description}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {isAdmin && (
                                                        <div className="mt-2 flex">
                                                            <button onClick={() => deleteEvent(event.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mx-2">Delete</button>
                                                            <button onClick={() => handleUpdateClick(event)} className="bg-green-500 text-white px-4 py-2 rounded-md mx-2">Update</button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
export default Events;