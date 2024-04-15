import React, { useState } from 'react';
import axios from 'axios'; 

const EventModal = ({ user, closeModal }) => {
    const [newEvent, setNewEvent] = useState({
        name: '',
        location: '',
        datetime: '',
        description: ''
    });

    const createEvent = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await axios.post('http://localhost:3000/events', newEvent, { withCredentials: true });
            setNewEvent({
                name: '',
                location: '',
                datetime: '',
                description: ''
            });
            
            closeModal(); // Close the modal after creating the event
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg">
                <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#17458F] text-lg font-bold">Create New Event</h3>
                    <button className="text-gray-500 font-bold text-xl focus:outline-none" onClick={closeModal}>x</button>
                </div>                    
                    <form onSubmit={createEvent} className="flex flex-col space-y-4">
                                            {/* Form fields for creating event */}
                        <input type="text" value={newEvent.name} placeholder="Name" onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2" />
                        <input type="text" value={newEvent.location} placeholder="Location" onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2" />
                        <input type="datetime-local" value={newEvent.datetime} onChange={(e) => setNewEvent({ ...newEvent, datetime: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2" />
                        <textarea value={newEvent.description} placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border border-gray-400 rounded-md px-3 py-2"></textarea>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md">Create Event</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
