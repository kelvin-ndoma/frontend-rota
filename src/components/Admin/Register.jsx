import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = ({ user }) => {
  const [attendanceLists, setAttendanceLists] = useState([]);

  useEffect(() => {
    fetchAttendanceLists();
  }, []);

  const fetchAttendanceLists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events', { withCredentials: true });
      const events = response.data;
      const promises = events.map(event => axios.get(`http://localhost:3000/events/${event.id}/attendance_list`, { withCredentials: true }));
      const attendanceResponses = await Promise.all(promises);
      const attendanceListsData = attendanceResponses.map(response => response.data);
      setAttendanceLists(attendanceListsData);
    } catch (error) {
      console.error('Error fetching attendance lists:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Attendance Lists</h2>
      {attendanceLists.map((attendanceList, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold mb-2">Event {index + 1} Attendance List</h3>
          <ul>
            {attendanceList.map(attendance => (
              <li key={attendance.id} className="border border-gray-400 rounded-md p-4 mb-4">
                <div><span className="font-semibold">User ID:</span> {attendance.user_id}</div>
                <div><span className="font-semibold">Status:</span> {attendance.status}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Register;
