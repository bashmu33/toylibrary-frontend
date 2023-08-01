import axios from 'axios';

// Define the API endpoint URL for adding a user
const apiUrl = 'https://toy-library.onrender.com/users'; // Replace with your backend's API URL

// Function to add the user data to the backend
export async function addUserToBackend(userData) {
  try {
    // Make an API POST request to the backend to add the user data
    const response = await axios.post(apiUrl, userData);

    // Handle the response from the server (if needed)
    console.log(response.data); // Log the response from the server

    // If you need to return anything from the backend, you can return it here
    // return response.data;

  } catch (error) {
    // Handle any errors that occurred during the API request
    console.error('Failed to add user:', error.message);
    throw new Error('Failed to add user');
  }
}
