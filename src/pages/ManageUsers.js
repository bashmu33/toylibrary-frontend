import React, { useState, useEffect, useMemo } from 'react';
import { Dropdown, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';
import '../css/ManageUsers.css';

const ManageUsers = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [clickedTransaction, setClickedTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const memoizedIsAdmin = useMemo(() => isAdmin(), []);

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
      const adminStatus = await memoizedIsAdmin;
      setIsAdminUser(adminStatus);
      console.log('isAdminUser:', adminStatus);
    };

    fetchUsers();
    checkAdminStatus();
  }, [memoizedIsAdmin]);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setSelectedUserDetails(null); 
    setClickedTransaction(null);   
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

  const handleTransactionClick = async (transaction) => {
    setClickedTransaction(transaction);
  
    try {
      const response = await axios.get(`https://toy-library.onrender.com/toys/${transaction.toy_id}`);
      const toyDetails = response.data;
  
      setClickedTransaction({
        ...transaction,
        toy_status: toyDetails.toy_status,
      });
    } catch (error) {
      setError('Error fetching transaction details');
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
      setUsers(users.filter((user) => user.user_id !== selectedUser.user_id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  const usersForDropdown = users.filter((user) => !user.isAdmin);

  return (
    <div className="manage-users-container">
      <Container className="center-horizontal">
        <div className="nav-space"></div> 
      </Container>
      <Container>
        <Row>
          <Col>
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
            </div>

            {selectedUserDetails && (
              <div className="user-details">
                <Card className="user-card" style={{ width: '400px' }}>
                  <Card.Body>
                    <Card.Title>User Details</Card.Title>
                    <ul className="user-list">
                      <li><strong>Name:</strong> {`${selectedUserDetails.first_name} ${selectedUserDetails.last_name}`}</li>
                      <li><strong>Email:</strong> {selectedUserDetails.email}</li>
                      <li><strong>Phone Number:</strong> {selectedUserDetails.phone_number}</li>
                    </ul>
                    <Button variant="danger" className="delete-user-button" onClick={deleteUser}>
                      Delete User
                    </Button>
                  </Card.Body>
                </Card>

                <div className="space"></div> {/* Space between user details and dropdown */}

                {selectedUserDetails.transactions.length > 0 && (
                  <div className="transaction-dropdown">
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="transaction-dropdown">
                        Select Transaction
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {selectedUserDetails.transactions.map((transaction) => (
                          <Dropdown.Item
                            key={transaction.transaction_id}
                            onClick={() => handleTransactionClick(transaction)}
                          >
                            Transaction ID: {transaction.transaction_id}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}

                {clickedTransaction && (
                  <div className="transaction-details">
                    <Card className="transaction-card" style={{ width: '250px' }}>
                      <Card.Body>
                        <Card.Title>Transaction Details</Card.Title>
                        <ul>
                          <li><strong>Transaction ID:</strong> {clickedTransaction.transaction_id}</li>
                          <li><strong>Toy ID:</strong> {clickedTransaction.toy_id}</li>
                          <li><strong>Status:</strong> {clickedTransaction.toy_status}</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </div>
                )}

                <div className="space"></div>

              </div>
            )}

            {error && <p className="error-message">{error}</p>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageUsers;
