import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mark = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [markedUsers, setMarkedUsers] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchUsers();
    const storedMarkedUsers = localStorage.getItem('markedUsers');
    if (storedMarkedUsers) {
      setMarkedUsers(JSON.parse(storedMarkedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('markedUsers', JSON.stringify(markedUsers));
  }, [markedUsers]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events', { withCredentials: true });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/users', { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    }
  };

  const markAttendance = async (userId, status) => {
    try {
      if (!selectedEvent) {
        console.error('No event selected');
        return;
      }

      const eventId = selectedEvent.id;

      const response = await axios.post(
        `http://localhost:3000/events/${eventId}/event_attendances`,
        { event_id: eventId, user_id: userId, status: status },
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
      );

      if (response.status === 200) {
        // Update state to trigger re-render
        setMarkedUsers([...markedUsers, { user_id: userId, event_id: eventId, status: status }]);

        // Fetch users again to update the list
        fetchUsers();
      } else {
        console.error('Error marking attendance:', response.data);
        setError(response.data.message || 'An error occurred while marking attendance');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      setError(error.message || 'An error occurred while marking attendance');
    }
  };

  const isMarked = (userId, status) => {
    return markedUsers.some(user => user.user_id === userId && user.event_id === selectedEvent?.id && user.status === status);
  };

  // Function to handle event selection
  const handleEventSelection = (eventId) => {
    setSelectedEvent(events.find(event => event.id === parseInt(eventId)));
    // Clear the markedUsers state when a new event is selected
    setMarkedUsers([]);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      {error && <p>Error: {error}</p>}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Select Event</h3>
        <select value={selectedEvent ? selectedEvent.id : ""} onChange={(e) => handleEventSelection(e.target.value)} className="border border-gray-400 rounded-md px-3 py-2 mb-2">
          <option value="">Select an event...</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <>
          <h3 className="text-xl font-semibold mb-2">Attendance for: {selectedEvent.name}</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.first_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button disabled={isMarked(user.id, 'present')} onClick={() => markAttendance(user.id, 'present')} className={`bg-green-500 text-white px-4 py-2 rounded-md mr-2 ${isMarked(user.id, 'present') ? 'opacity-50 cursor-not-allowed' : ''}`}>Mark Present</button>
                    <button disabled={isMarked(user.id, 'absent')} onClick={() => markAttendance(user.id, 'absent')} className={`bg-red-500 text-white px-4 py-2 rounded-md mr-2 ${isMarked(user.id, 'absent') ? 'opacity-50 cursor-not-allowed' : ''}`}>Mark Absent</button>
                    <button disabled={isMarked(user.id, 'apology')} onClick={() => markAttendance(user.id, 'apology')} className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isMarked(user.id, 'apology') ? 'opacity-50 cursor-not-allowed' : ''}`}>Mark Apology</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Mark;
