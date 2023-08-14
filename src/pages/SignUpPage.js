import SignUp from '../components/SignUp';
import React from 'react';
import { Container } from 'react-bootstrap'

const SignUpPage = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <SignUp />
            </div>
        </Container>
        );
    };

export default SignUpPage;