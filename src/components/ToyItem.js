import { Card, Button, Row, Col } from "react-bootstrap";
import React from 'react';

const ToyItem = ({ toy, onHoldButtonClick}) => {
    const {id, name, type, recommendedAge, imageSrc, description } = toy;

    const handleHoldButtonClick = () => {
        onHoldButtonClick(id);
    };

    return (
        <Card style={{ marginBottom: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '30%', padding: '10px' }}>
              <img
                src={imageSrc}
                alt={name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div style={{ width: '70%', padding: '10px' }}>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Type: {type}</Card.Text>
                <Card.Text>Recommended Age: {recommendedAge}</Card.Text>
                <Card.Text>{description}</Card.Text>
                <Button
                  onClick={handleHoldButtonClick}
                  style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                >
                  Place Hold
                </Button>
              </Card.Body>
            </div>
          </div>
        </Card>
      );
    };
    
    
    
    export default ToyItem;
