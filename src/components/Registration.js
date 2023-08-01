import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { addUserToBackend } from '../api'; // Import a function to add the user data to the backend
import { useAuth } from '../contexts/AuthContext'; // Import the AuthContext for accessing the currentUser
import { Link } from 'react-router-dom';

export default function RegistrationPage() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dateOfBirthRef = useRef();
  const phoneNumberRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      // Get the user data from the form
      const userData = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        date_of_birth: dateOfBirthRef.current.value,
        phone_number: phoneNumberRef.current.value,
        email: currentUser.email, // Use the email from Firebase currentUser
      };

      // Call the API function to add the user data to the backend
      await addUserToBackend(userData);

      // Redirect the user to a different page after successful registration
      // (You can use react-router-dom to handle the redirection)
      // history.push('/other-page'); // Import useHistory from 'react-router-dom'

    } catch (error) {
      setError('Failed to register');
    }

    setLoading(false);
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Registration</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="first-name">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" ref={firstNameRef} required />
          </Form.Group>
          <Form.Group controlId="last-name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" ref={lastNameRef} required />
          </Form.Group>
          <Form.Group controlId="date-of-birth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" ref={dateOfBirthRef} required />
          </Form.Group>
          <Form.Group controlId="phone-number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" ref={phoneNumberRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
