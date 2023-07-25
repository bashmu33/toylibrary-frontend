import { Card, Button } from "react-bootstrap";
import React from 'react';
import PropTypes from 'prop-types';


const ToyItem = ({ toy, onReserveButtonClick }) => {
  const { toy_id, toy_image, toy_name, description, age_category, toy_status } = toy;

  const handleReserveClick = async () => {
    if (toy_status === 'available') {
      // Call the onReserveButtonClick function with  toy_id
      const success = await onReserveButtonClick(toy_id);
      if (success) {
        // The reservation was successful, the status changes in ToyInventory
      }
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
              onClick={handleReserveClick} 
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
  onReserveButtonClick: PropTypes.func.isRequired, 
};

export default ToyItem;

