import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    // Make API call to register the user
    axios.post('/api/register', formData)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        // Optionally, you can redirect to a success page or perform other actions.
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Existing input fields */}
      {/* ... */}
      
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
