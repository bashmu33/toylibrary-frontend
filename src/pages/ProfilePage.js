import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import '../App.css';

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
  
        const reservationsWithToys = await Promise.all(
          reservationsResponse.data.map(async (reservation) => {
            const toyResponse = await axios.get(`${kBaseUrl}/toys/${reservation.toy_id}`);
            return {
              ...reservation,
              toy_name: toyResponse.data.toy_name,
            };
          })
        );

        const checkoutsWithToys = await Promise.all(
          checkoutsResponse.data.map(async (checkout) => {
            const toyResponse = await axios.get(`${kBaseUrl}/toys/${checkout.toy_id}`);
            return {
              ...checkout,
              toy_name: toyResponse.data.toy_name,
            };
          })
        );

        setReservations(reservationsWithToys);
        setCheckouts(checkoutsWithToys);
      } catch (error) {
        setError('Error fetching user transactions');
      }
    };
  
    if (auth.currentUser) {
      fetchUserProfile();
  
      
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
    <div className="profile-container">
      {userProfile && (
        <Card className="profile-card">
          <Card.Body>
            <h2 className="profile-heading">User Profile</h2>
            <table className="user-info-table">
              <tbody>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{userProfile.first_name} {userProfile.last_name}</td>
                </tr>
                <tr>
                  <td><strong>User ID:</strong></td>
                  <td>{userProfile.user_id}</td>
                </tr>
                <tr>
                  <td><strong>Date of Birth:</strong></td>
                  <td>{userProfile.date_of_birth}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{userProfile.email}</td>
                </tr>
                <tr>
                  <td><strong>Phone Number:</strong></td>
                  <td>{userProfile.phone_number}</td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      )}

      <div className="transactions-section">
        <div className="reservations">
          <h3>Reservations</h3>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <Card key={reservation.transaction_id} className="mb-3">
                <Card.Body>
                  <h5>Toy Name: {reservation.toy_name}</h5>
                  <p>Reserve Date: {reservation.reserve_date}</p>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reservations found.</p>
          )}
        </div>

        <div className="checkouts">
          <h3>Checkouts</h3>
          {checkouts.length > 0 ? (
            checkouts.map((checkout) => (
              <Card key={checkout.transaction_id} className="mb-3">
                <Card.Body>
                  <h5>Toy Name: {checkout.toy_name}</h5>
                  <p>Checkout Date: {checkout.checkout_date}</p>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No checkouts found.</p>
          )}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfilePage;