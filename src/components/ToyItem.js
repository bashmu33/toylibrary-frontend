import { Card, Button } from "react-bootstrap";
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import axios from "axios";

const kBaseUrl = "https://toy-library.onrender.com"

const ToyItem = ({ toy, setToys }) => {
  const { toy_id, toy_image, toy_name, description, age_category, toy_status } = toy;
  const auth = useAuth();

  const handleReserveButtonClick = async (toy_id) => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;
  
      const response = await axios.post(
        `${kBaseUrl}/users/${userId}/reserve/${toy_id}`
      );
  
      if (response.status === 200) {
        // Update the reservation status in the UI
        setToys((prevToys) => {
          console.log('prevToys before update:', prevToys);

          const updatedToys = prevToys.map((toy) =>
            toy.toy_id === toy_id
              ? { ...toy, toy_status: 'reserved' }
              : toy
          );

          console.log('updatedToys:', updatedToys);

          return updatedToys;
        });
      }
    } catch (error) {
      console.error('Error reserving toy:', error);
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
            <Card.Text>Recommended Age:{age_category}</Card.Text>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <Button
              style={{ position: 'absolute', bottom: '10px', right: '10px' }}
              variant={toy_status === 'available' ? 'primary' : 'secondary'}
              disabled={toy_status === 'reserved'}
              onClick={() => handleReserveButtonClick(toy_id)}
            >
              {toy_status === 'available' ? 'Reserve Toy' : 'Reserved'}
            </Button>
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
