import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getAll} from '../Firebase';
import Tutorial from './Tutorial';

const TutorialList = () => {
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const [tutorials, loading, error] = useCollection(getAll().orderBy("title", "asc"));
    console.log("tutorials getAll", getAll());

    console.log("tutorials", tutorials);
    console.log("tutorials error", error);

    const refreshList = () => {
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    }

    const setActiveTutorial = (tutorial, index) => {
        console.log('Tutorial data', tutorial.data())
        const { title, descr, published } = tutorial.data();
        setCurrentTutorial({
            id: tutorial.id,
            title,
            descr,
            published
        });
        setCurrentIndex(index);
    }
    return (
        <>
           <div className="tutorial-list">
              <h2 className="card-heading"> Tutorial List </h2>
                <div class="custom-box">
                    {error && <strong>Error: {error} </strong>}
                    {loading && <span className="text-center loading"><img src="../loading.gif" /> </span>}
                    <ul>
                        {
                            !loading && tutorials && tutorials.docs.map((tutorial, index) => (
                                <li
                                    onClick={() => { setActiveTutorial(tutorial, index) }}
                                    key={tutorial.id}
                                >
                                    
                                    {tutorial.data().title}
                                </li>
                            ))
                        }
                    </ul>
                    <div className="tutorial-list-text">
                        {currentTutorial?(
                            <Tutorial tutorial={currentTutorial} refreshList={refreshList}  />
                        ):(
                            <p>Please click on a tutorial</p>
                        )}
                    </div>
                </div>
           </div>
       </>
    )
}

export default TutorialList;