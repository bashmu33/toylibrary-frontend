import { Card, Button } from "react-bootstrap";
import React from 'react';
import PropTypes from 'prop-types';


const ToyItem = ({ toy }) => {
  const { toy_image, toy_name, description, age_category, toy_status } = toy;

  return (
    <Card style={{ marginBottom: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', padding: '10px' }}>
          <img
            src={toy_image}
            alt={toy_name}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
        <div style={{ width: '70%', padding: '10px' }}>
          <Card.Body>
            <Card.Title>{toy_name}</Card.Title>
            <Card.Text>Recommended Age:{age_category}</Card.Text>
            <Card.Text>{description}</Card.Text>
            <Button
              style={{ position: 'absolute', bottom: '10px', right: '10px' }}
              variant={toy_status === 'available' ? 'primary' : 'secondary'}
              disabled={toy_status === 'reserved'}
            >
              {toy_status === 'available' ? 'Reserve Toy' : 'Reserved'}
            </Button>
          </Card.Body>
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
    toy_image: PropTypes.string, // Make sure this is the correct key for the toy image
  }).isRequired,
};

export default ToyItem;

