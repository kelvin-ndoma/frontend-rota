import React, { useState, useEffect } from 'react';

const Register = () => {
  const [events, setEvents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');

  useEffect(() => {
    fetchAllEvents(); // Fetch all events when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const fetchAllEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        throw new Error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/users/all_event_attendances`);
      if (response.ok) {
        const data = await response.json();
        setAttendanceRecords(data);
      } else {
        throw new Error('Failed to fetch attendance records');
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  const handleEventChange = (event) => {
    setSelectedEventId(event.target.value);
  };

  const renderAttendanceRecords = () => {
    if (!selectedEventId) return null; // Return null if no event is selected

    // Filter attendance records based on the selected event ID
    const filteredRecords = attendanceRecords.filter(record => record.event_id === parseInt(selectedEventId));

    return (
      <div>
        <h3>Attendance Records for Selected Event:</h3>
        {filteredRecords.map((record, index) => (
          <div key={index}>
            <p>User: {record.user.first_name} {record.user.last_name}</p>
            <p>Attendance: {record.status}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Attendance Records for Event</h2>
      
      <label htmlFor="eventSelect">Select Event:</label>
      <select id="eventSelect" value={selectedEventId} onChange={handleEventChange}>
        <option value="">Select an event</option>
        {events.map(event => (
          <option key={event.id} value={event.id}>{event.name}</option>
        ))}
      </select>

      <button onClick={fetchAttendanceRecords}>Fetch Attendance Records</button>

      <div>
        {renderAttendanceRecords()}
      </div>
    </div>
  );
};

export default Register;
