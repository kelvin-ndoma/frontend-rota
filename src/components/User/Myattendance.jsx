import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Myattendance = ({ user }) => {
  const [attendances, setAttendances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendances = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/users/${user.id}/event_attendances`, {
          withCredentials: true
        });
        const sortedAttendances = response.data.sort((a, b) => {
          // Sort in descending order based on the event date
          return new Date(b.event_date) - new Date(a.event_date);
        });
        setAttendances(sortedAttendances);
        if (sortedAttendances.length === 0) {
          setError("No attendances found.");
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

    fetchAttendances();
  }, [user]);

  // Function to format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) {
        throw new Error('Invalid date');
      }
      return date.toLocaleString(); // Adjust this according to your preferred date format
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Attendances</h2>

      {isLoading && <div>Loading...</div>}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {attendances.length > 0 && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full sm:min-w-max border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Event Name</th>
                  <th className="border border-gray-300 px-4 py-2">User Name</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((attendance, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{attendance.event_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.status}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatDate(attendance.event_date)}</td>
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

export default Myattendance;
