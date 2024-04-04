import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [eventId, setEventId] = useState(null);
  const [attendances, setAttendances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setEventId(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:3000/admin/events/${eventId}/all_event_attendances`);
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

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust this according to your preferred date format
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Register Attendance <br></br> Please select an event below</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <label htmlFor="event-id" className="block mb-2">Event ID:</label>
        <input type="number" id="event-id" name="event-id" onChange={handleChange} min="1" className="border border-gray-300 rounded-md py-1 px-2 w-full sm:w-20 mr-2 bg-gray-100" />
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
