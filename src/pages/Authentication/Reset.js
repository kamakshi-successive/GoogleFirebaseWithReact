import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, sendPasswordResetEmail } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Header from '../../component/Header';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [user, loading, err] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) history.replace("/dashboard");
    }, [user, loading, history]);

    return (
        <>
            <Header />
            <div className="main_container">
                <Container className="col-md-4 auth_container">
                    <Row className="auth_content">
                        <h2 className="text-center"> Reset Password  </h2>
                        <p className="auth_text">Authentication process has been used
                            for Reset Password. Please fill Email Address and click to Send Password reset email button. It will send email on your email address. </p>
                        <Form.Group className="mb-3 p-0" controlId="formBasicEmail">
                            <Form.Label>Please Enter Email Address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </Form.Group>
                        <Button className="mb-3 submit_btn" onClick={() => sendPasswordResetEmail(email)}>Send Password reset email</Button>
                        <div className="d-flex justify-content-between">
                            <p>Don't have an account? <Link to="/register">Register</Link>
                            </p>
                            <p>Already have an account? <Link to="/">Login</Link> now.</p>
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Reset;