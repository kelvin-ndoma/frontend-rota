import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admindashboard from "./components/Admin/Admindashboard";
import axios from "axios";

// import Events from "./components/Admin/Events1";
import Events from "./components/Admin/Events";
import Mark from "./components/Admin/Mark";
import Register from "./components/Admin/Register";
import Payment from "./components/Admin/Payments";
import Dashboard from "./components/User/Dashboard";
import Myattendance from "./components/User/Myattendance";
import Userevents from "./components/User/Userevents"; // Import Userevents component
import Mypayments from "./components/User/Mypayments";
import Welcome from "./components/Admin/Welcome";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logged_in", {
        headers: {
          Accept: "application/json"
        },
        withCredentials: true
      });
      console.log('Response from /logged_in route:', response);
      if (response.data.logged_in) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/logout");
      if (response.status === 200) {
        setUser(null);
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          {user && user.role === 'admin' && (
            <Route path="/admindashboard/*" element={<Admindashboard user={user}  />} >
              {/* Admin welcome page */}
              {/* <Route path="/welcome" element={<Welcome user={user} />} /> */}
              <Route path="events" element={<Events user={user} />} />
              <Route path="mark" element={<Mark user={user} />} />
              <Route path="register" element={<Register user={user} />} />
              <Route path="payments" element={<Payment user={user} />} />
            </Route>
          )}
          {user && user.role !== 'admin' && (
            <Route path="/dashboard" element={<Dashboard user={user} />}>
              <Route path="myattendance" element={<Myattendance user={user} />} />
              <Route path="userevents" element={<Userevents user={user} />} /> {/* Use Userevents component */}
              <Route path="mypayments" element={<Mypayments user={user}  />} />
            </Route>
          )}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>
      </>
    </Router>
  );
}

export default App;
