
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../css/AdminPortal.css';


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
    const [showForm, setShowForm] = useState(false);

    const handleAddToyClick = () => {
        setShowForm(!showForm);
    };
    
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
        const checkAdminStatus = async () => {
            const adminStatus = await isAdmin();
            setIsAdminUser(adminStatus);
            console.log("isAdminUser:", adminStatus);
        };

        checkAdminStatus();
    }, []);

    return (
        <div className="button-container-admin">
    
            {isAdminUser ? (
                <div className="button-container-admin">
                    <div className="button-section">
                        <Button
                            variant="primary"
                            className="btn-lg m-3"
                            onClick={handleAddToyClick}
                        >
                            Add Toy
                        </Button>
                    </div>
                    <div className="button-section">
                        <Link to="/toy-inventory" className="btn btn-success btn-lg m-3">
                            Checkout Toy to User
                        </Link>
                    </div>
                    <div className="button-section">
                        <Link to="/manage-users" className="btn btn-info btn-lg m-3">
                            Manage Users
                        </Link>
                    </div>
                
    
                    {showForm && (
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
                            <Button variant="primary" type="submit" className="m-3">
                                Add Toy
                            </Button>
                        </Form>
                    )}
                </div>
        
            ) : (
                <p>You do not have permission to access this page.</p>
            )}
            </div>
    );
            };

    export default AdminPortal;