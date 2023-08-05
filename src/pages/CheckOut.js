import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, Button } from 'react-bootstrap';
import ToyItem from '../components/ToyItem';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
const location = useLocation();
const { toy_id } = location.state || {};
const [toy, setToy] = useState(null);
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
    // Fetch toy details
    const fetchToy = async () => {
        try {
        const response = await axios.get(`https://toy-library.onrender.com/toys/${toy_id}`);
        setToy(response.data);
        } catch (error) {
        console.error('Error fetching toy:', error);
        console.log('Error response:', error.response.data);
        }
    };

    // Fetch list of users
    const fetchUsers = async () => {
    try {
        const response = await axios.get('https://toy-library.onrender.com/users');
        setUsers(response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
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
    alert('Please select a user.');
    return;
    }

    // Perform your checkout logic here
    // ...

    alert('Toy checked out successfully.');
};

return (
    <div className="checkout-page">
    {toy && (
        <div>
            <ToyItem toy={toy} toyId={toy_id} setToys={() => {}} />
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="user-dropdown">
            {selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : 'Select User'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {users.map((user) => (
                <Dropdown.Item key={user.user_id} onClick={() => handleUserSelect(user)}>
                {`${user.first_name} ${user.last_name}`}
                </Dropdown.Item>
            ))}
            </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={handleCheckoutButtonClick}>
            Check Out
        </Button>
        </div>
    )}
    </div>
);
};

export default Checkout;
