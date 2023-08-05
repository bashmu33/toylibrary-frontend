import { Card, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const kBaseUrl = 'https://toy-library.onrender.com';

const ToyItem = ({ toy, setToys, onCheckOutButtonClick }) => {
  const { toy_id, toy_image, toy_name, description, age_category, toy_status } = toy;
  const auth = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await auth.isAdmin();
      setIsAdminUser(adminStatus);
    };

    const checkLoggedInStatus = () => {
      const user = auth.currentUser;
      setIsLoggedIn(user !== null);
    };

    checkAdminStatus();
    checkLoggedInStatus();
  }, []);

  const handleReserveButtonClick = async (toy_id) => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;

      const response = await axios.post(
        `${kBaseUrl}/users/${userId}/reserve/${toy_id}`
      );

      if (response.status === 200) {
        //change reservation status
        setToys((prevToys) => {
          const updatedToys = prevToys.map((toy) =>
            toy.toy_id === toy_id
              ? { ...toy, toy_status: 'reserved' }
              : toy
          );
          return updatedToys;
        });
      }
    } catch (error) {
      console.error('Error reserving toy:', error);
    }
  };

  const handleCheckOutButtonClick = () => {
    onCheckOutButtonClick(toy.toy_id);
  };
  

  const handleDeleteButtonClick = async (toy_id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this toy?');
      if (!confirmDelete) return;

      await axios.delete(`${kBaseUrl}/toys/${toy_id}/confirm_delete`);

      // Remove the deleted toy from the list
      setToys((prevToys) => prevToys.filter((t) => t.toy_id !== toy_id));
    } catch (error) {
      console.error('Error deleting toy:', error);
    }
  };

  //button logic to render buttons based on admin vs logged in vs everyone else
  const renderButtons = () => {
    if (!isLoggedIn) {
      return null; // No buttons
    } else if (isAdminUser) {
      return (
        <div>
          <Button
            variant="danger"
            onClick={() => handleDeleteButtonClick(toy_id)}
          >
            Delete Toy
          </Button>
          <Button
            variant={toy_status === 'available' ? 'primary' : 'secondary'}
            onClick={handleCheckOutButtonClick}
            disabled={toy_status === 'available' && !isAdminUser}
          >
            {toy_status === 'available' ? 'Check Out' : 'Check Out Reserved Toy'}
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          variant={toy_status === 'available' ? 'primary' : 'secondary'}
          disabled={toy_status === 'reserved'}
          onClick={() => handleReserveButtonClick(toy_id)}
        >
          {toy_status === 'available' ? 'Reserve Toy' : 'Reserved'}
        </Button>
      );
    }
  };

  
  
  return (
    <Card style={{ position: 'relative', marginBottom: '20px', width: '45%', minWidth: '300px' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: '40%', padding: '10px' }}>
          <img
            src={toy_image}
            alt={toy_name}
            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
          />
        </div>
        <div style={{ width: '60%', padding: '10px', position: 'relative' }}>
          <Card.Body>
            <Card.Title>{toy_name}</Card.Title>
            <Card.Text>Recommended Age: {age_category}</Card.Text>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          {renderButtons()}
        </div>
      </div>
    </Card>
  );
};

ToyItem.propTypes = {
  toy: PropTypes.shape({
    toy_id: PropTypes.number.isRequired,
    toy_name: PropTypes.string.isRequired,
    description: PropTypes.string,
    age_category: PropTypes.string,
    toy_status: PropTypes.string.isRequired,
    toy_image: PropTypes.string,
  }).isRequired,
  setToys: PropTypes.func.isRequired,
};

export default ToyItem;
