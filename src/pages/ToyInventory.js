import React, { useState, useEffect } from 'react';
import ToyList from '../components/ToyList';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const kBaseUrl = "https://toy-library.onrender.com";

  const ToyInventory = () => {
      const [toys, setToys] = useState([]);
      const auth = getAuth(); // Get the auth object
      const history = useHistory();
    
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
        }
      } catch (error) {
        console.error('Error reserving toy:', error);
      }
      return false;
    };

    const handleCheckOutButtonClick = (toy_id) => {
      // Route to the checkout page with the toy_id as a prop
      history.push({
        pathname: '/checkout',
        state: { toy_id: toy_id }
      });
    };
      
      

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Toy Page</h2>
          <div style={{ marginTop: '50px', width: '100%', maxWidth: '1200px', marginLeft: '40px' }}>
            <ToyList toys={toys} onReserveButtonClick={handleReserveButtonClick} auth={auth} setToys={setToys} onCheckOutButtonClick={handleCheckOutButtonClick} />
          </div>
        </div>
      );
    };
    

export default ToyInventory;