import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://3.110.165.0:8000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://3.110.165.0:8000/signup', {
        username,
        email,
        password,
        name,
        phone_number: phone,
        country_name: country
      });
      // Redirect to login page after successful signup
      setIsSignup(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        {isSignup && (
          <>
            <input 
              name="username" 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <input 
              name="name" 
              type="text" 
              placeholder="Name" 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <input 
              name="phone" 
              type="text" 
              placeholder="Phone" 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
            <input 
              name="country" 
              type="text" 
              placeholder="Country" 
              onChange={(e) => setCountry(e.target.value)} 
              required 
            />
          </>
        )}
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Signup'}
      </button>
    </div>
  );
};

export default Login;
