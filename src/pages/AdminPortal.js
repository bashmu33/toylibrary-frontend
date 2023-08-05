import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; 


const ageCategories = [
    'Age 3m+',
    'Age 6m+',
    'Age 9m+',
    'Age 12m+',
    'Age 2+',
    'Age 3+',
    'Age 4+',
    'Age 5+',
    'Age 6+',
    'Age 7+',
    'Age 8+',
];

const AdminPortal = () => {
    const [formData, setFormData] = useState({
        toy_name: '',
        description: '',
        age_category: '',
        toy_status: 'available',
        toy_image: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newToy = {
            toy_name: formData.toy_name,
            description: formData.description,
            age_category: formData.age_category,
            toy_status: formData.toy_status,
            toy_image: formData.toy_image,
        };

        axios.post('https://toy-library.onrender.com/toys', newToy)
            .then(response => {
                console.log('New Toy:', response.data.new_toy);
                // Clear form after submitting
                setFormData({
                    toy_name: '',
                    description: '',
                    age_category: '',
                    toy_status: 'available',
                    toy_image: '',
                });
            })
            .catch(error => {
                console.error('Error adding toy:', error);
            });
    };

    const { isAdmin } = useAuth();

    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
        //Check if the currentuser is  admin
        const checkAdminStatus = async () => {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);
        console.log("isAdminUser:", adminStatus); //check
        };

    checkAdminStatus();
}, []);

console.log("Rendering with isAdminUser:", isAdminUser);

    return (
        <div className="admin-portal">
            <h2 className="mt-4">Administrative Portal</h2>
            {isAdminUser ? (
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="toy_name">
                    <Form.Label>Toy Name:</Form.Label>
                    <Form.Control type="text" name="toy_name" value={formData.toy_name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="age_category">
                    <Form.Label>Age Category:</Form.Label>
                    <Form.Control
                        as="select"
                        name="age_category"
                        value={formData.age_category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Recommended Age</option>
                        {ageCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="toy_status">
                    <Form.Label>Toy Status:</Form.Label>
                    <Form.Control type="text" name="toy_status" value={formData.toy_status} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="toy_image">
                    <Form.Label>Toy Image URL:</Form.Label>
                    <Form.Control
                        type="url"
                        name="toy_image"
                        value={formData.toy_image}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        Enter the URL of the toy image in your AWS S3 bucket.
                    </Form.Text>
                </Form.Group>

                {/* Image Display */}
                {formData.toy_image && (
                    <div className="mt-3">
                        <h5>Preview</h5>
                        <img src={formData.toy_image} alt="Toy" className="img-fluid" />
                    </div>
                )}

                <Button variant="primary" type="submit" className="mt-3">
                    Add Toy
                </Button>
            </Form>
            ) : (
                <p>You do not have permission to access this page.</p>
            )}
        </div>
    );
};

export default AdminPortal;
