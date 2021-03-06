import { Button } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import firebaseConfig from './firebase.confiq';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../../App';
import NavBar from '../../Shared/NavBar/NavBar';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    // const [isAdmin, setIsAdmin] = useState(false);

    // useEffect(() => {

    // }, [])


    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                setLoggedInUser(user);

                sessionStorage.setItem('img', user.photoURL);
                sessionStorage.setItem('email', user.email);
                sessionStorage.setItem('name', user.displayName);

                fetch('https://peaceful-mesa-18274.herokuapp.com/isAdmin', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ email: sessionStorage.getItem('email') })
                })
                    .then(res => res.json())
                    .then(result => {
                        // setIsAdmin(result);
                        sessionStorage.setItem("isAdmin", result);
                        storeAuthToken(result);
                    })

                // console.log(user);
                
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });
    }

    // console.log(loggedInUser);

    const storeAuthToken = (result) => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then((idToken) => {
                sessionStorage.setItem('token', idToken);
                
                result? history.replace('/Dashboard') : history.replace(from);
                
                

            }).catch((error) => {
                // Handle error
            });
    }

    return (
        <div>
            <NavBar></NavBar>
            <Container>
                <Row style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
                    <Col md={4}>
                        <h3 className='text-center mb-5'>Login With</h3>
                        <button onClick={handleGoogleSignIn} class="corner d-flex align-items-center justify-content-around btn btn-danger w-100" type="reset">
                            <FontAwesomeIcon size='2x' className="google" icon={faGoogle} />
                            <span>continue with google</span>
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;