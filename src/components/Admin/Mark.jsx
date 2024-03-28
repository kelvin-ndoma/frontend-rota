import React, { useState, useEffect } from 'react';

const Mark = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [users, setUsers] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const storedEvent = localStorage.getItem('selectedEvent');
    if (storedEvent) {
      setSelectedEvent(storedEvent);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedEvent', selectedEvent);
    fetchUsers();
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'GET',
        credentials: 'include',
      });
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

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/users', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
    fetchUsers();
  };

  const markAttendance = (userId, status) => {
    const updatedRecords = [...attendanceRecords.filter((record) => record.user_id !== userId), { user_id: userId, status }];
    setAttendanceRecords(updatedRecords);
  };

  const renderAttendanceButtons = (userId, selectedStatus) => {
    return (
      <div>
        {['present', 'absent', 'apology'].map((status) => (
          <button
            key={status}
            onClick={() => markAttendance(userId, status)}
            className={`mr-2 ${
              selectedStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } px-4 py-2 rounded`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    );
  };

  const handleSubmitAttendance = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${selectedEvent}/event_attendances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ event_attendances: attendanceRecords }),
      });
      if (response.ok) {
        console.log('Attendance marked successfully');
        setAttendanceRecords([]);
      } else {
        throw new Error('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      <label htmlFor="eventSelect" className="block mb-2">
        Select Event:
      </label>
      <select
        id="eventSelect"
        value={selectedEvent}
        onChange={handleEventChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>

      {selectedEvent && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{`${user.first_name} ${user.last_name}`}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {renderAttendanceButtons(user.id, (attendanceRecords.find(record => record.user_id === user.id) || {}).status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSubmitAttendance}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Mark Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default Mark;
