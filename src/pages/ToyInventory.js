import React, { useState, useEffect } from 'react';
import ToyList from '../components/ToyList';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase'; // Import the auth object from your firebase.js file


const kBaseUrl = "https://toy-library.onrender.com";

  const ToyInventory = () => {
      const [toys, setToys] = useState([]);
      const auth = getAuth(); // Get the auth object
    
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
        const user = auth.currentUser;
        const userId = user.uid;
    
        const response = await axios.post(
          `${kBaseUrl}/users/${userId}/reserve/${toy_id}`
        );
    
        if (response.status === 200) {
          // ...
        }
      } catch (error) {
        console.error('Error reserving toy:', error);
      }
      return false;
    };
      
      

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Toy Page</h2>
          <div style={{ marginTop: '50px', width: '100%', maxWidth: '1200px', marginLeft: '40px' }}>
            <ToyList toys={toys} onReserveButtonClick={handleReserveButtonClick} auth={auth} setToys={setToys} />
          </div>
        </div>
      );
    };
    

export default ToyInventory;