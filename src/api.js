import axios from 'axios';


const apiUrl = 'https://toy-library.onrender.com/users'; 

export async function addUserToBackend(userData) {
  try {
    
    const response = await axios.post(apiUrl, userData);

    
    console.log(response.data); // Log the response from the server


    return response.data;

  } catch (error) {
    // Handle any errors that occurred during the API request
    console.error('Failed to add user:', error.message);
    throw new Error('Failed to add user');
  }
}

