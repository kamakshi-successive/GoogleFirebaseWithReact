import React, { useState } from 'react';
import { create } from '../Firebase';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

const AddTutorial = () => {
    const initialTutorialState = {
        title: "",
        descr: "",
        published: false
    };

    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setTutorial({ ...tutorial, [name]: value });
    }
    const saveTutorial = () => {
        let data = {
            title: tutorial.title,
            descr: tutorial.descr,
            published: false
        }
        create(data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            })
    }
    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setSubmitted(false)
    }
    return (
        <> <div className="add-tutorial">
                <h2 className="card-heading"> Add Tutorial  </h2>
                <div class="custom-box">
                    <Form.Group className="form-group">
                        <Form.Label for="title">Title</Form.Label>
                        <Form.Control type="text" id="title" value={tutorial.title} onChange={handleInputChange} name="title" required />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label for="descr">Description</Form.Label>
                        <Form.Control type="text" id="descr" value={tutorial.descr} onChange={handleInputChange} name="descr" required />
                    </Form.Group>
                    <Button className="mt-2" onClick={saveTutorial}>Submit</Button>

                    <div>
                    {
                        submitted ? (
                            <>
                                <h4 className="mt-4">Your data submitted successfully</h4>
                                <Button onClick={newTutorial}>Add More Tutorial</Button>
                            </>
                        ) : (
                            <>

                            </>
                        )

                    }
                </div>
                </div>
           </div>
               
         
        </>
    )
}

export default AddTutorial;