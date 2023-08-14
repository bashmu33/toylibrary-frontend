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

const YOUR_TWILIO_ACCOUNT_SID = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const YOUR_TWILIO_AUTH_TOKEN = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
const YOUR_TWILIO_MESSAGING_SERVICE = process.env.REACT_APP_TWILIO_MESSAGING_SERVICE;

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
            setToy((prevToy) => ({
                ...prevToy,
                toy_status: 'checked_out',
            }));

            setError(null);
            alert(`Toy checked out successfully.`);

            // Uncomment the Twilio API call here and update with your own logic
            /*
            await axios.post(
                `https://api.twilio.com/2010-04-01/Accounts/${YOUR_TWILIO_ACCOUNT_SID}/Messages.json`,
                new URLSearchParams({
                    MessagingServiceSid: YOUR_TWILIO_MESSAGING_SERVICE,
                    To: selectedUser.phone_number,
                    Body: `Hi ${selectedUser.first_name}, your toy (${toy.toy_name}) is due in 2 days. Toy ID is ${toy_id}.`,
                    ScheduleType: 'fixed',
                    SendAt: dueDate.toISOString(),
                }),
                {
                    auth: {
                        username: YOUR_TWILIO_ACCOUNT_SID,
                        password: YOUR_TWILIO_AUTH_TOKEN,
                    },
                }
            );
            */
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError('An error occurred during checkout.');
        }
    }
};



const filteredUsers = users.filter(user => !user.isAdmin);

return (
    <Container className="d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
        <h2 style={{ margin: '40px', textAlign: 'center' }}>Toy Checkout</h2>
    {toy && (
        <Row>
        <Col md={12}>
            <div className="border p-3 m-3" style={{ textAlign: 'center' }}>
            <h4>{toy.toy_name}</h4>
            </div>
            <div className="border p-3 m-3" style={{ textAlign: 'center' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="secondary m-3" id="user-dropdown">
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
            <Button variant="primary m-3" onClick={handleCheckoutButtonClick}>
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
