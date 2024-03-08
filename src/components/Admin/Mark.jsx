import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mark = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [attendances, setAttendances] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  
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

  const fetchAttendanceList = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/events/${selectedEvent}/attendance_list`, { withCredentials: true });
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendance list:', error);
    }
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleStatusChange = (event) => {
    setAttendanceStatus(event.target.value);
  };

  const markAttendance = async () => {
    try {
      await axios.post(`http://localhost:3000/events/${selectedEvent}/mark_attendance`, { attendance: { user_id: user.id, status: attendanceStatus } }, { withCredentials: true });
      alert('Attendance marked successfully');
      // Refetch attendance list after marking attendance
      fetchAttendanceList();
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance. Please try again.');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Mark Attendance</h2>
      <div className="mb-4">
        <label htmlFor="eventSelect" className="block text-sm font-medium text-gray-700 mb-2">Select Event:</label>
        <select id="eventSelect" value={selectedEvent} onChange={handleEventChange} className="border border-gray-400 rounded-md px-3 py-2 mb-2">
          <option value="">Select an event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <div>
          <label htmlFor="statusSelect" className="block text-sm font-medium text-gray-700 mb-2">Select Attendance Status:</label>
          <select id="statusSelect" value={attendanceStatus} onChange={handleStatusChange} className="border border-gray-400 rounded-md px-3 py-2 mb-2">
            <option value="">Select status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Apology">Apology</option> {/* Include Apology option */}
          </select>
          <button onClick={markAttendance} className="bg-blue-500 text-white px-4 py-2 rounded-md">Mark Attendance</button>
        </div>
      )}

      {attendances.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-4 mb-2">Attendance List</h3>
          <ul>
            {attendances.map(attendance => (
              <li key={attendance.id} className="border border-gray-400 rounded-md p-4 mb-4">
                <div><span className="font-semibold">User ID:</span> {attendance.user_id}</div>
                <div><span className="font-semibold">Status:</span> {attendance.status}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Mark;
