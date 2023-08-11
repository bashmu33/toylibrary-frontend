import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { addUserToBackend } from '../api'; // Import the function to add the user data to the backend

export default function RegistrationPage() {
const firstNameRef = useRef();
const lastNameRef = useRef();
const dateOfBirthRef = useRef();
const phoneNumberRef = useRef();
const { currentUser } = useAuth();
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const [fetchingUser, setFetchingUser] = useState(true); 
const history = useHistory();

useEffect(() => {
    if (currentUser) {
    // User data has been fetched
    setFetchingUser(false);
    }
}, [currentUser]);
    

console.log('currentUser:', currentUser);
console.log('currentUser.uid:', currentUser.uid);


async function handleSubmit(e) {
    e.preventDefault();

    try {
    setError('');
    setLoading(true);

    if (!currentUser) {
        history.push('/')
        return;
    }

    const phoneNumber = phoneNumberRef.current.value;
        const formattedPhoneNumber = `+1${phoneNumber}`;

        if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
            setError('Please enter a valid 10-digit phone number.');
            setLoading(false);
            return;
        }

    console.log('currentUser:', currentUser);
    console.log('currentUser.uid:', currentUser.uid);

    const userData = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        date_of_birth: dateOfBirthRef.current.value,
        phone_number: formattedPhoneNumber,
        email: currentUser.email,
        firebase_uid: currentUser.uid, 
    };

    await addUserToBackend(userData); // Call the API function to add the user data to the backend
    history.push('/'); // Redirect to the homepage after successful registration

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
            <Form.Control
                type="tel"
                ref={phoneNumberRef}
                required
                minLength="10"
                maxLength="10"
                pattern="[0-9]{10}"
                placeholder="Input valid 10-digit phone number"
            />
        </Form.Group>
        <Button disabled={loading} className="w-100" type="submit">
            Register
        </Button>
        </Form>
    </Card.Body>
    </Card>
);
}