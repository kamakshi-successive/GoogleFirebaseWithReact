import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../../Firebase';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Header from '../../component/Header';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [user, loading, err] = useAuthState(auth);
    const history = useHistory();

    const register = () => {
        if (!name) alert("Please Enter Name");
        registerWithEmailAndPassword(name, email, pwd)
    }
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
                        <h2 className="text-center"> Create an Account!  </h2>
                        <p className="auth_text">Authentication process has been used
                            for register an details. Please fill form and click to Register button. </p>
                        <Form.Group className="mb-3 p-0" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="te" value={name} onChange={(e) => setName(e.target.value)} placeholder="Please Enter Name..." />
                        </Form.Group>
                        <Form.Group className="mb-3 p-0" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please Enter Email..." />
                        </Form.Group>
                        <Form.Group className="mb-3 p-0" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Please Enter Password..." />
                        </Form.Group>
                        <Button className="mb-3 submit_btn" onClick={register}>Register</Button>
                        <Button className="mb-3 google_btn" onClick={() => signInWithGoogle(email, pwd)}>     <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />Register with google</Button>
                        <div className="d-flex justify-content-between forgot-password">
                            <Link to="/reset">Forgot Password?</Link>
                            <p>Already have an account? <Link to="/">Login</Link> now.
                            </p>
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Register;