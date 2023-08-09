import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Import your authentication context
import { Redirect } from 'react-router-dom';

const ManageUsers = () => {
    const { isAdmin } = useAuth(); // Use the isAdmin function from your authentication context
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://toy-library.onrender.com/users');
                console.log('Fetched Users:', response.data);
                setUsers(response.data);
            } catch (error) {
                setError('Error fetching users');
            }
        };

        const checkAdminStatus = async () => {
            const adminStatus = await isAdmin();
            setIsAdminUser(adminStatus);
            console.log('isAdminUser:', adminStatus);
        };

        fetchUsers();
        checkAdminStatus();
    }, []);

    const handleUserSelect = async (user) => {
        setSelectedUser(user);
        setError(null);

        try {
            const response = await axios.get(`https://toy-library.onrender.com/transactions/user/${user.user_id}`);
            setSelectedUserDetails({
                ...user,
                transactions: response.data,
            });
        } catch (error) {
            setError('Error fetching user transactions');
        }
    };

    const deleteUser = async () => {
        console.log('Deleting user:', selectedUser);
        if (!selectedUser) return;
    
        try {
            await axios.delete(`https://toy-library.onrender.com/users/${selectedUser.user_id}`);
            console.log('User deleted successfully.');
            setSelectedUser(null);
            setSelectedUserDetails(null);
            setUsers(users.filter(user => user.user_id !== selectedUser.user_id));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user');
        }
    };

    // Filter out the admin user from the users list
    const usersForDropdown = users.filter(user => !user.isAdmin);


    return (
        <div className="manage-users">
            <h2>Manage Users</h2>
            {isAdminUser ? (
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="user-dropdown">
                        {selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : 'Select User'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {usersForDropdown.map((user) => (
                            <Dropdown.Item
                                key={user.user_id}
                                onClick={() => handleUserSelect(user)}
                                className={selectedUser && selectedUser.user_id === user.user_id ? 'selected-user' : ''}
                            >
                                {`${user.first_name} ${user.last_name}`}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <p>You do not have permission to access this page.</p>
            )}

            {selectedUserDetails && (
                <div className="user-details">
                    <h4>User Information</h4>
                    <p><strong>Name:</strong> {`${selectedUserDetails.first_name} ${selectedUserDetails.last_name}`}</p>
                    <p><strong>Email:</strong> {selectedUserDetails.email}</p>

                    <Button variant="danger" onClick={deleteUser}>
                        Delete User
                    </Button>

                    <h4>User Transactions</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Toy ID</th>
                                <th>Status</th>
                                <th>Reserve Date</th>
                                <th>Checkout Date</th>
                                <th>Due Date</th>
                                <th>Return Date</th>
                                <th>Overdue Fines</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedUserDetails.transactions.map((transaction) => (
                                <tr key={transaction.transaction_id}>
                                    <td>{transaction.transaction_id}</td>
                                    <td>{transaction.toy_id}</td>
                                    <td>{transaction.status}</td>
                                    <td>{transaction.reserve_date}</td>
                                    <td>{transaction.checkout_date}</td>
                                    <td>{transaction.due_date}</td>
                                    <td>{transaction.return_date}</td>
                                    <td>{transaction.overdue_fines}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ManageUsers;
