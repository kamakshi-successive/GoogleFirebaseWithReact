import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, signInWithGoogle } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Header from '../../component/Header';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [user, loading, err] = useAuthState(auth);
    const history = useHistory();

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })
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
                        <h2 className="text-center"> Welcome Back!  </h2>
                        <p className="auth_text">Authentication process has been used
                            for Login an details. Please fill form and click to Login button. </p>
                        <Form.Group className="mb-3 p-0" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email address..." />
                        </Form.Group>
                        <Form.Group className="mb-3 p-0" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Enter Password..." />
                        </Form.Group>
                        <Button className="mb-3 submit_btn" onClick={() => signInWithEmailAndPassword(email, pwd)}>Login</Button>
                        <Button className="mb-3 google_btn" onClick={() => signInWithGoogle(email, pwd)}>     <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />Sign in with google</Button>
                        <div className="d-flex justify-content-between">
                            <Link to="/reset">Forgot Password</Link>
                            <p>Don't have an account?<Link to="/register"> Register</Link>
                            </p>
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login;