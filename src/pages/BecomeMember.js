import React, { useState } from 'react';

const MAX_USERNAME_LENGTH = 9; // Maximum length for the username

const BecomeMember = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_name_verify: '',
    date_of_birth: '',
    email: '',
    phone_number: '',
    address: '',
    pin: '',
    pin_verify: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check username length
    if (name === 'user_name' && value.length > MAX_USERNAME_LENGTH) {
      setFormErrors({ ...formErrors, user_name: `Username must be less than ${MAX_USERNAME_LENGTH} characters.` });
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Phone number validation
    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!phoneRegex.test(formData.phone_number)) {
      errors.phone_number = 'Please enter a valid phone number.';
    }

    // Username verification
    if (formData.user_name !== formData.user_name_verify) {
      errors.user_name_verify = 'Usernames do not match.';
    }

    // PIN verification
    if (formData.pin !== formData.pin_verify) {
      errors.pin_verify = 'PINs do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Perform form submission and database operations here
      console.log('Form submitted successfully:', formData);
      setFormData({
        user_name: '',
        user_name_verify: '',
        date_of_birth: '',
        email: '',
        phone_number: '',
        address: '',
        pin: '',
        pin_verify: '',
      });
      setFormErrors({});
    }
  };

  return (
    <div className="container">
      <h2>Become a Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-8 mb-5">
            <label htmlFor="user_name">User Name:</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className={`form-control ${formErrors.user_name ? 'is-invalid' : ''}`}
              required
            />
            {formErrors.user_name && <div className="invalid-feedback">{formErrors.user_name}</div>}
            {formData.user_name.length > 0 && formData.user_name.length <= MAX_USERNAME_LENGTH && (
              <small className="text-muted">{`${MAX_USERNAME_LENGTH - formData.user_name.length} characters remaining`}</small>
            )}
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="user_name_verify">Verify User Name:</label>
            <input
              type="text"
              id="user_name_verify"
              name="user_name_verify"
              value={formData.user_name_verify}
              onChange={handleChange}
              className={`form-control ${formErrors.user_name_verify ? 'is-invalid' : ''}`}
              required
            />
            {formErrors.user_name_verify && <div className="invalid-feedback">{formErrors.user_name_verify}</div>}
          </div>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
            required
          />
          {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
        </div>
        <div className="form-group col-md-4 mb-5">
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className={`form-control ${formErrors.phone_number ? 'is-invalid' : ''}`}
            placeholder="e.g., (123) 456-7890"
            required
          />
          {formErrors.phone_number && <div className="invalid-feedback">{formErrors.phone_number}</div>}
        </div>
        <div className="form-group col-md-12 mb-5">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., 1234 Main St"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-8 mb-5">
            <label htmlFor="pin">PIN:</label>
            <input
              type="password"
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              className={`form-control ${formErrors.pin ? 'is-invalid' : ''}`}
              placeholder="Enter a 4-digit numeric PIN"
              pattern="[0-9]{4}"
              required
            />
            {formErrors.pin && <div className="invalid-feedback">{formErrors.pin}</div>}
          </div>
          <div className="form-group col-md-8 mb-5">
            <label htmlFor="pin_verify">Verify PIN:</label>
            <input
              type="password"
              id="pin_verify"
              name="pin_verify"
              value={formData.pin_verify}
              onChange={handleChange}
              className={`form-control ${formErrors.pin_verify ? 'is-invalid' : ''}`}
              required
            />
            {formErrors.pin_verify && <div className="invalid-feedback">{formErrors.pin_verify}</div>}
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ position: 'absolute', bottom: '1px', right: '15px' }}>Create Account</button>
      </form>
    </div>
  );
};

export default BecomeMember;
