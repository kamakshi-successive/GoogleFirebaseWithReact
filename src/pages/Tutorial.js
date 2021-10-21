import React, { useState } from 'react';
import { update, remove } from '../Firebase';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';


const Tutorial = (props) => {
    const initialTutorialState = {
        key: null,
        title: "",
        descr: "",
        published: false
    };

    const [currenttutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState("");
    const { tutorial } = props;

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTutorial({ ...tutorial, [name]: value });
    };

    if (currenttutorial.id !== tutorial.id) {
        setCurrentTutorial(tutorial);
        setMessage("");
    }

    const updatePublished = (status) => {
        update(currenttutorial.id, { published: status })
            .then(() => {
                setCurrentTutorial({ ...currenttutorial, published: status });
                setMessage("The status was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const updateTutorial = () => {
        const data = {
            title: currenttutorial.title,
            descr: currenttutorial.descr,
        }
        update(currenttutorial.id, data)
            .then(() => {
                setMessage("The Tutorial has updated successfully")
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const deleteTutorial = () => {
        remove(currenttutorial.id)
            .then(() => {
                props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
          <div className="tutorial">
            {
                currenttutorial ? (
                    <>
                        <h2 className="card-heading">Tutorial</h2>
                        <form>
                            <Form.Group className="p-0 form-group">
                                <Form.Label for="title">Title</Form.Label>
                                <Form.Control type="text" id="title" name="title" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label for="descr">Description</Form.Label>
                                <Form.Control type="text" id="descr" name="descr" onChange={handleInputChange} />
                            </Form.Group>
                            <div className="status">
                                <label>
                                    <strong>
                                        Status:
                                    </strong>
                                </label>
                            </div>

                        </form>
                        <div className="mb-3 mt-2">
                            {currenttutorial.published ? (
                                <Button onClick={() => updatePublished(false)}>Unpublish</Button>
                            ) : (
                                <Button onClick={() => updatePublished(true)}>Publish</Button>

                            )}
                        </div>
                        <p className="success-message">{message}</p>

                        <div className="d-flex justify-content-between">
                            <Button onClick={deleteTutorial} className="btn-type-2">Delete</Button>
                            <Button onClick={updateTutorial}>Update</Button>
                        </div>

                    </>
                ) : (
                    <>
                        <p>Please Click on a Tutorial</p>
                    </>
                )
            }
          </div>  
        </>
    )
}

export default Tutorial;