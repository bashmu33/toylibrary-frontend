import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom'

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Passwords do not match');
        }

        try {
        setError('');
        setLoading(true);
        await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        history.push("/register")
        } catch {
        setError('Failed to create an account');
        }
        setLoading(false);
        }

    return (
        <>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                Sign Up
                </Button>
            </Form>
            </Card.Body>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingLeft: '15px', paddingRight: '15px' }}>
                <div>Already have an account?</div>
                <div>
                    <Link className="m-2" to="/login">Log In</Link>
                </div>
            </div>
        </>
    );
}
