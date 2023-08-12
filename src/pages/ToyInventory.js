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

    const handleReturnButtonClick = async (toy_id) => {
      // Handle returning a toy
      try {
        const response = await axios.post(
          `${kBaseUrl}/transactions/${toy_id}/return_toy`
        );
  
        if (response.status === 200) {
          // Update toy status to 'available'
          setToys((prevToys) => {
            const updatedToys = prevToys.map((toy) =>
              toy.toy_id === toy_id
                ? { ...toy, toy_status: 'available' }
                : toy
            );
            return updatedToys;
          });
        }
      } catch (error) {
        console.error('Error returning toy:', error);
      }
    };
      
      

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Toy Inventory</h2>
          <div style={{ marginTop: '50px', width: '100%', maxWidth: '1200px', marginLeft: '40px' }}>
            <ToyList toys={toys} onReserveButtonClick={handleReserveButtonClick} auth={auth} setToys={setToys} onCheckOutButtonClick={handleCheckOutButtonClick} onReturnButtonClick={handleReturnButtonClick}  />
          </div>
        </div>
      );
    };
    

export default ToyInventory;