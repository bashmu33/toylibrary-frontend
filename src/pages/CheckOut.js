import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Dropdown, Button, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
const location = useLocation();
const { toy_id } = location.state || {};
const [toy, setToy] = useState(null);
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchToy = async () => {
    try {
        const response = await axios.get(`https://toy-library.onrender.com/toys/${toy_id}`);
        setToy(response.data);
    } catch (error) {
        setError('Error fetching toy');
    }
    };

    const fetchUsers = async () => {
    try {
        const response = await axios.get('https://toy-library.onrender.com/users');
        setUsers(response.data);
    } catch (error) {
        setError('Error fetching users');
    }
    };

    fetchToy();
    fetchUsers();
}, [toy_id]);

const handleUserSelect = (user) => {
    setSelectedUser(user);
};

const handleCheckoutButtonClick = async () => {
    if (!selectedUser) {
    setError('Please select a user.');
    return;
    }

    try {
    const response = await axios.post(
        `https://toy-library.onrender.com/users/${selectedUser.user_id}/checkout/${toy_id}`
    );

    if (response.status === 200) {
        const checkoutUser = `${selectedUser.first_name} ${selectedUser.last_name}`;

        // Update toy status to 'checked_out' in the local state
        setToy((prevToy) => ({
        ...prevToy,
        toy_status: 'checked_out',
        }));

        setError(null); // Clear any previous errors
        alert(`Toy checked out successfully by ${checkoutUser}.`);
    }
    } catch (error) {
    // Check if error response contains mismatched user error message
    if (error.response?.data?.message) {
        setError(error.response.data.message);
    } else {
        setError('Error checking out toy');
    }
    }
};

// Filter out admin user from the users list
const filteredUsers = users.filter(user => !user.isAdmin);

return (
    <Container className="my-5 text-center">
    <h2 className="mb-3">Check Out Page</h2>
    {toy && (
        <Row className="justify-content-center">
        <Col md={8}>
            {/* Toy Information */}
            <div className="border p-3 mb-3">
            <h4>{toy.toy_name}</h4>
            <p>{toy.description}</p>
            <p>Recommended Age: {toy.age_category}</p>
            </div>
            {/* User Selection and Checkout */}
            <div className="border p-3">
            {error && <Alert variant="danger">{error}</Alert>}
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="secondary" id="user-dropdown">
                {selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : 'Select User'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {filteredUsers.map((user) => (
                    <Dropdown.Item
                    key={user.user_id}
                    onClick={() => handleUserSelect(user)}
                    className={selectedUser && selectedUser.user_id === user.user_id ? 'reserved-user' : ''}
                    >
                    {`${user.first_name} ${user.last_name}`}
                    </Dropdown.Item>
                ))}
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={handleCheckoutButtonClick}>
                Check Out
            </Button>
            </div>
        </Col>
        </Row>
    )}
    </Container>
);
};

export default Checkout;
