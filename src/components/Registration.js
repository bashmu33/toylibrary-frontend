import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { addUserToBackend } from '../api'; 
import { useAuth } from '../contexts/AuthContext'; 

export default function RegistrationPage() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dateOfBirthRef = useRef();
  const phoneNumberRef = useRef();
  const { currentUser } = useAuth();
  console.log(currentUser); // Log the currentUser object to the console
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      setError('');
      setLoading(true);
  
      const userData = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        date_of_birth: dateOfBirthRef.current.value,
        phone_number: phoneNumberRef.current.value,
        email: currentUser.email,
        firebase_uid: currentUser.uid,
      };
  
      await addUserToBackend(userData);
  
      // ...
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
