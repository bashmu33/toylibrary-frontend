import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const ageCategories = [
    'Age 3m+',
    'Age 6m+',
    'Age 9m+',
    'Age 12m+',
    'Age 1+',
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
    toy_id: uuidv4(), // Generate a unique ID for the new toy
    ...formData,
    };
    // Handle saving the newToy to the backend here
    console.log('New Toy:', newToy);
    // Clear the form after submission
    setFormData({
    toy_name: '',
    description: '',
    age_category: '',
    toy_status: 'available', 
    toy_image: '',
    });
};

return (
    <div className="admin-portal">
    <h2>Administrative Portal</h2>
    <Form onSubmit={handleSubmit}>
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
        <Form.Control type="url" name="toy_image" value={formData.toy_image} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
        Add Toy
        </Button>
    </Form>
    </div>
);
};

export default AdminPortal;

