import React, { useState, useEffect } from 'react';
import ToyList from '../components/ToyList';
import axios from 'axios';

const kBaseUrl = "http://127.0.0.1:5000";


        // {
        //     id: 1,
        //     name: 'Scrabble Board',
        //     type: 'Board Games',
        //     recommendedAge: '8+',
        //     imageSrc: 'https://fw-toy-library.s3.us-east-2.amazonaws.com/SCRABBLEIMAGE.jpg',
        //     description: 'Classic board game for older children and adults where you use letters to build words and earn points.',
        //   },
        //   {
        //     id: 2,
        //     name: 'Toy 2',
        //     type: 'Type B',
        //     recommendedAge: '5+',
        //     imageSrc: 'toy2.jpg',
        //     description: 'Description of Toy 2',
        //   },
        //   // Add more toys here
        // ]);



  const ToyInventory = () => {
      const [toys, setToys] = useState([]);
    
      useEffect(() => {
        // Fetch toy information from the backend API
        const fetchToys = async () => {
          try {
            const response = await axios.get(`${kBaseUrl}/toys`);
            setToys(response.data);
          } catch (error) {
            console.error('Error fetching toy information:', error);
          }
        };
    
        fetchToys();
      }, []);

    // const handleReserveButtonClick = async (toyId) => {
    //   try {
    //     // Get the user ID 
    //     const userId = 1; // just for testing
    
    //     const response = await axios.post(
    //       `${kBaseUrl}/users/reserve_toy`,
    //       { user_id: userId, toy_id: toyId }
    //     );
    //     if (response.status === 200) {
    //       // Successfully reserved the toy, update the toy status in the state
    //       const updatedToys = toys.map((toy) =>
    //         toy.id === toyId ? { ...toy, toy_status: 'reserved' } : toy
    //       );
    //       setToys(updatedToys);
    //     }
    //   } catch (error) {
    //     // Handle any error that occurs during the API call
    //     console.error('Error reserving toy:', error);
    //   }
    // };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Toy Page</h2>
          <div style={{ marginTop: '50px', width: '100%', maxWidth: '1200px', marginLeft: '40px' }}>
            <ToyList toys={toys} />
            {/* <ToyList toys={toys} onReserveButtonClick={handleReserveButtonClick} /> */}
          </div>
        </div>
      );
    };
    

export default ToyInventory;