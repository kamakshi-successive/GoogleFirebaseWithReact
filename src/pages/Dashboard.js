import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../Firebase';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import AddTutorial  from './AddTutotial';
import TutorialList from './TutorialList';
import Header from '../component/Header';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [user, loading, err] = useAuthState(auth);
    const history = useHistory();
    const [flag, setFlag] = useState(true);

    const fetchUserName = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            console.log('data', data)
            setName(data.name)
        }
        catch (err) {
            console.error(err);
            console.log("An error occur while fetching the user data")
        }
    }

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) history.replace("/");
        fetchUserName();
    }, [user, loading, history]);

    return (
        <>
        <Header flag={flag} name={name} email={user?.email}/>
        <div className="main_container">
            <Container className="d-flex" >
              <div className="col-md-8 pLR">
                <AddTutorial />
              </div>
              <div className="col-md-4 pLR">
                <TutorialList />
              </div>
            </Container>
        </div>
        </>
    )
}

export default Dashboard;