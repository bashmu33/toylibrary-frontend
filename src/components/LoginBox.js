import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Buttonholder from './ButtonHolder'

const LoginBox = ({ hideLoginBox }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="login-box">
      <Card className="login-card">
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="barcode">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter barcode" className="mb-3" />
            </Form.Group>
            <Form.Group controlId="pin">
              <Form.Label>PIN:</Form.Label>
              <Form.Control type="password" placeholder="Enter PIN" className="mb-3" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
          <Button variant="danger" className="close-x" onClick={hideLoginBox}>
            <span className="close-icon">&times;</span>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginBox;
