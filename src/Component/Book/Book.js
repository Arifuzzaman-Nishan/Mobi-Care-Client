import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { userContext } from '../../App';
import NavBar from '../Shared/NavBar/NavBar';
import ProcessPayment from '../UserDashBoard/ProcessPayment/ProcessPayment';
import SideBar from '../UserDashBoard/SideBar/SideBar';


const stripePromise = loadStripe('pk_test_51IeR1DBqk7A6FGoihILlnb6K5upwovEy0jozWTRMbXdZWyFnKbErD5cHHuKJFNQWZvKAtvcnwOnKg42JHN7keTSg00ViHYTScT');


const Book = () => {

    const { id } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { displayName, email } = loggedInUser;

    const [specificService, setSpecificService] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/specificService/${id}`)
            .then(res => res.json())
            .then(data => {
                setSpecificService(data);
            })
    }, [id])

    return (
        <div>
            <NavBar></NavBar>
            <Row>
                <Col md={2}>
                    <SideBar id={id}></SideBar>
                </Col>
                <Col md={10}>
                    <div>
                        <h5>{displayName}</h5>
                        <h5>{email}</h5>
                        <h5>{specificService.name}</h5>
                        <br />
                        <Elements stripe={stripePromise}>
                            <ProcessPayment></ProcessPayment>
                        </Elements>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Book;