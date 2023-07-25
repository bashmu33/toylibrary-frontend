import React, { useState, useEffect } from 'react';
import ToyList from '../components/ToyList';
import axios from 'axios';

const kBaseUrl = "http://127.0.0.1:5000";

  const ToyInventory = () => {
      const [toys, setToys] = useState([]);
    
      useEffect(() => {
        // get toy information from the backend API
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

      const handleReserveButtonClick = async (toy_id) => {
        try {
          // logic to get the user ID here
          const userId = 3; // just for testing
    
          // Make the API call to reserve the toy
          const response = await axios.post(
            `${kBaseUrl}/users/${userId}/reserve/${toy_id}`
          );
    
          if (response.status === 200) {
            // Successfully reserved the toy, update the toy status in the state
            setToys((prevToys) =>
              prevToys.map((toy) =>
                toy.toy_id === toy_id ? { ...toy, toy_status: 'reserved' } : toy
              )
            );
            return true;
          }
        } catch (error) {
          // error handling during API call
          console.error('Error reserving toy:', error);
        }
        return false;
  };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Toy Page</h2>
          <div style={{ marginTop: '50px', width: '100%', maxWidth: '1200px', marginLeft: '40px' }}>
            <ToyList toys={toys} onReserveButtonClick={handleReserveButtonClick}/>
            {/* <ToyList toys={toys} onReserveButtonClick={handleReserveButtonClick} /> */}
          </div>
        </div>
      );
    };
    

export default ToyInventory;