import React, { useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const kBaseUrl = 'https://toy-library.onrender.com';

const ProfilePage = () => {
  const auth = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [checkouts, setCheckouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${kBaseUrl}/users/profile/${auth.currentUser.uid}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    const fetchUserTransactions = async (userId) => {
      try {
        const reservationsResponse = await axios.get(`${kBaseUrl}/transactions/user/${userId}/reservations`);
        const checkoutsResponse = await axios.get(`${kBaseUrl}/transactions/user/${userId}/checkouts`);
  
        setReservations(reservationsResponse.data);
        setCheckouts(checkoutsResponse.data);
      } catch (error) {
        setError('Error fetching user transactions');
      }
    };
  
    if (auth.currentUser) {
      fetchUserProfile();
  
      // Fetch user_id associated with the uid
      axios.get(`${kBaseUrl}/users/uid/${auth.currentUser.uid}`)
        .then(response => {
          const user_id = response.data.user_id;
          fetchUserTransactions(user_id);
        })
        .catch(error => {
          console.error('Error fetching user_id:', error);
          setError('Error fetching user_id');
        });
    }
  }, [auth.currentUser]);


  if (!auth.currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile && (
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title>{userProfile.first_name} {userProfile.last_name}</Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroupItem><strong>User ID:</strong> {userProfile.user_id}</ListGroupItem>
              <ListGroupItem><strong>Date of Birth:</strong> {userProfile.date_of_birth}</ListGroupItem>
              <ListGroupItem><strong>Email:</strong> {userProfile.email}</ListGroupItem>
              <ListGroupItem><strong>Phone Number:</strong> {userProfile.phone_number}</ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      {/* Display Checkouts and Reservations */}
      <h3>Reservations</h3>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.transaction_id}>{reservation.toy_name} - {reservation.reserve_date}</li>
        ))}
      </ul>

      <h3>Checkouts</h3>
      <ul>
        {checkouts.map((checkout) => (
          <li key={checkout.transaction_id}>{checkout.toy_name} - {checkout.checkout_date}</li>
        ))}
      </ul>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfilePage;
