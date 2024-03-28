import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Myattendances = ({ user }) => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${user.id}/event_attendances`, { withCredentials: true });
        console.log('Response:', response.data); // Add this line to check response data
        setAttendances(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user attendances:', error);
        setError('Error fetching attendances. Please try again later.');
        setLoading(false);
      }
    };


    fetchAttendances();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Attendances</h2>
      {attendances.length === 0 ? (
        <div>No attendances to show.</div>
      ) : (
        <ul>
          {attendances.map((attendance) => (
            <li key={attendance.id}>
              <div>Event: {attendance.event ? attendance.event.id : 'Unknown Event'}</div>
              <div>Status: {attendance.status}</div>
              {/* Add more details as needed */}
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default Myattendances;
