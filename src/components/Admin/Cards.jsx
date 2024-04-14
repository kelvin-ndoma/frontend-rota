import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";
import EventModal from './EventModal';
import Upcomingevents from './Upcomingevents';

const Cards = () => {
    const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
    const [upcomingEventsModalOpen, setUpcomingEventsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: '',
        location: '',
        datetime: '',
        description: ''
    });

    // Function to open create event modal
    const openCreateEventModal = () => {
        setCreateEventModalOpen(true);
        setUpcomingEventsModalOpen(false); // Close upcoming events modal if open
    };

    // Function to close create event modal
    const closeCreateEventModal = () => {
        setCreateEventModalOpen(false);
    };

    // Function to open upcoming events modal
    const openUpcomingEventsModal = () => {
        setUpcomingEventsModalOpen(true);
        setCreateEventModalOpen(false); // Close create event modal if open
    };

    // Function to close upcoming events modal
    const closeUpcomingEventsModal = () => {
        setUpcomingEventsModalOpen(false);
    };

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 p-6'>
            {/* Create event card */}
            <div className="w-full">
                <div className="flex items-center card bg-orange-500 rounded-md h-32" onClick={openCreateEventModal}>
                    <MdAdd className="text-white text-4xl m-2" />
                    <h1 className="text-white font-semibold">Create Event</h1>
                </div>
                {createEventModalOpen && <EventModal user={{ role: 'admin' }} closeModal={closeCreateEventModal} />}
            </div>
            <div className="w-full">
                <div className="flex items-center card bg-orange-500 rounded-md h-32" onClick={openUpcomingEventsModal}>
                    <MdAdd className="text-white text-4xl m-2" />
                    <h1 className='text-white font-semibold p-4'>Upcoming Events</h1>
                </div>
                {upcomingEventsModalOpen && <Upcomingevents user={{ role: 'admin' }} closeModal={closeUpcomingEventsModal} />}
            </div>
            <div className="w-full">
                <div className="flex items-center card bg-orange-500 rounded-md h-32">
                    <MdAdd className="text-white text-4xl m-2" />
                    <h1 className='text-white font-semibold p-4'>Past Events</h1>
                </div>
            </div>
            <div className="w-full">
                <div className="flex items-center card bg-orange-500 rounded-md h-32">
                    <MdAdd className="text-white text-4xl m-2" />
                    <h1 className='text-white font-semibold p-4'>View Attendance</h1>
                </div>
            </div>
        </section>
    );
};

export default Cards;
