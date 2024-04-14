import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upcomingevents = ({ user, closeModal }) => {
    const [events, setEvents] = useState([]);

    const isAdmin = user && user.role === 'admin';

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


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* events list */}
            <div className="flex flex-wrap justify-start mt-8">
                <div className="w-full p-4 drop-shadow-2xl rounded-lg bg-white overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[#17458F] text-base font-bold mb-2">Events List</h3>
                        <button className="text-gray-500 font-bold text-xl focus:outline-none" onClick={closeModal}>x</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className='table-auto border-collapse border border-gray-300'>
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Location</th>
                                    <th className="border border-gray-300 px-4 py-2">Date</th>
                                    {/* <th className="border border-gray-300 px-4 py-2">Description</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event.id}>
                                        <td className="border border-gray-300 px-4 py-2">{event.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{event.location}</td>
                                        <td className="border border-gray-300 px-4 py-2">{event.datetime}</td>
                                        {/* <td className="border border-gray-300 px-4 py-2">{event.description}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Upcomingevents;