import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [eventId, setEventId] = useState(null);
  const [attendances, setAttendances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event object
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events',{withCredentials: true });
        setEvents(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch events. Please try again later.");
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (event) => {
    const selectedEventName = event.target.value;
    const eventObject = events.find(event => event.name === selectedEventName);
    setSelectedEvent(eventObject); // Update selected event object
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!selectedEvent) {
        setError("Please select an event");
        return;
      }
      const response = await axios.get(`http://localhost:3000/admin/events/${selectedEvent.id}/all_event_attendances`, {withCredentials: true });
      setAttendances(response.data);
      if (response.data.length === 0) {
        setError("No attendances for this event");
      } else {
        setError(null);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch attendances. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Event ID changed:", eventId);
  }, [eventId]);

  useEffect(() => {
    console.log("Attendances updated:", attendances);
  }, [attendances]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Register Attendance <br></br> Please select an event below</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <label htmlFor="event-name" className="block mb-2">Event Name:</label>
        <select
          id="event-name"
          name="event-name"
          value={selectedEvent ? selectedEvent.name : ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-1 px-2 w-full mb-2 bg-gray-100"
        >
          <option value="">Select an event</option>
          {events.map(event => (
            <option key={event.id} value={event.name}>{event.name}</option>
          ))}
        </select>
        <button type="submit" disabled={isLoading} className="bg-blue-500 text-white py-1 px-2 rounded-md">
          {isLoading ? 'Loading...' : 'Get Attendances'}
        </button>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {attendances.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Attendances </h3>
          <div className="overflow-x-auto">
            <table className="w-full sm:min-w-max border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Event Name</th>
                  <th className="border border-gray-300 px-4 py-2">User ID</th>
                  <th className="border border-gray-300 px-4 py-2">First Name</th>
                  <th className="border border-gray-300 px-4 py-2">Last Name</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Created At</th>
                  <th className="border border-gray-300 px-4 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((attendance) => (
                  <tr key={attendance.id}>
                    <td className="border border-gray-300 px-4 py-2">{attendance.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.event.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.user.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.user.first_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.user.last_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.status}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatDate(attendance.created_at)}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatDate(attendance.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
