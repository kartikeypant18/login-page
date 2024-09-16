import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return; // Exit early if there's no token
      }

      try {
        const response = await axios.get('http://3.110.165.0:8000/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Optionally, you can also send a request to the server if needed
      await axios.post('http://3.110.165.0:8000/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Remove token from localStorage
      localStorage.removeItem('token');

      // Redirect to login page
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.name}</p>
      <p>Phone: {userData.phone_number}</p>
      <p>Country: {userData.country_name}</p>

      {/* Logout Button */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
};

export default Dashboard;
