import React, { useState } from 'react';
import ToyList from '../components/ToyList';

const ToyInventory = () => {
    const [toys, setToys] = useState([
        {
            id: 1,
            name: 'Scrabble Board',
            type: 'Board Games',
            recommendedAge: '8+',
            imageSrc: 'https://fw-toy-library.s3.us-east-2.amazonaws.com/SCRABBLEIMAGE.jpg',
            description: 'Classic board game for older children and adults where you use letters to build words and earn points.',
          },
          {
            id: 2,
            name: 'Toy 2',
            type: 'Type B',
            recommendedAge: '5+',
            imageSrc: 'toy2.jpg',
            description: 'Description of Toy 2',
          },
          // Add more toys here
        ]);

    const handleHoldButtonClick = (toyId) => {
        const updatedToys = toys.map((toy) => {
            if (toy.id === toyId) {

            }
            return toy;
        });
    
        setToys(updatedToys);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Toy Page</h2>
          <div style={{ marginTop: '50px', width: '100%', maxWidth: '1200px', marginLeft: '40px' }}>
            <ToyList toys={toys} onHoldButtonClick={handleHoldButtonClick} />
          </div>
        </div>
      );
    };
    

export default ToyInventory;