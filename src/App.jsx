import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admindashboard from "./components/Admin/Admindashboard";
import Dashboard from "./components/User/Dashboard";
import axios from "axios";

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
      console.log('Response from /logged_in route:', response); // Add this line to log the response
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
            <Route path="/admindashboard" element={<Admindashboard user={user} />} />
          )}
          {user && user.role === 'normal' && (
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          )}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {!user && <Route path="*" element={<Navigate to="/login" replace />} />} {/* Redirect to login if no user */}
        </Routes>

      </>
    </Router>
  );
}

export default App;
