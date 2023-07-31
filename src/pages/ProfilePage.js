// // ProfilePage.js

// import React, { useRef, useState } from 'react';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
// import { useAuth } from '../contexts/AuthContext';
// import { useHistory } from 'react-router-dom';

// export default function ProfilePage() {
//   const firstNameRef = useRef();
//   const lastNameRef = useRef();
//   const dateOfBirthRef = useRef();
//   // Add more refs for other form inputs (e.g., phone number, address, etc.)

//   const { currentUser } = useAuth();
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const history = useHistory();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     // Collect user input values from the form fields
//     const userData = {
//       username: currentUser.email, // You can use the user's email from currentUser
//       first_name: firstNameRef.current.value,
//       last_name: lastNameRef.current.value,
//       date_of_birth: dateOfBirthRef.current.value,
//       // Add other user attributes as needed (e.g., phone_number, address, etc.)
//     };

//     try {
//       setError('');
//       setLoading(true);

//       // Send the user information to the backend using an HTTP POST request
//       // (e.g., using Axios or Fetch)
//       // Your API endpoint should handle saving this user information to the database
//       // For this example, let's assume you have an endpoint '/users/profile' on your backend
//       await axios.post('/users/profile', userData);

//       // Redirect the user to another page (e.g., Home page) after successful sign-up and profile completion
//       history.push('/');
//     } catch {
//       setError('Failed to save profile information');
//     }

//     setLoading(false);
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Profile Setup</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="firstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control type="text" ref={firstNameRef} required />
//             </Form.Group>
//             <Form.Group id="lastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control type="text" ref={lastNameRef} required />
//             </Form.Group>
//             <Form.Group id="dateOfBirth">
//               <Form.Label>Date of Birth</Form.Label>
//               <Form.Control type="date" ref={dateOfBirthRef} required />
//             </Form.Group>
//             {/* Add more form fields for other user attributes (e.g., phone number, address, etc.) */}
//             <Button disabled={loading} className="w-100" type="submit">
//               Save Profile
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }
