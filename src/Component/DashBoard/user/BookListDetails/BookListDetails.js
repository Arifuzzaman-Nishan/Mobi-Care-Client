import React from 'react';
import { Card, Col } from 'react-bootstrap';
import './BookListDetails.css';

const BookListDetails = ({ bookList }) => {
    const { img, serviceName, description,status } = bookList;
    console.log('booklist',bookList);
    console.log(status);

    return (
        <Col md={5} className='mx-auto mb-5'>
            <Card style={{height:'30vh'}} className='p-4'>
                <div className='d-flex justify-content-between'>
                    <img style={{ width: '6rem', borderRadius: "" }} src={img} alt="" />
                    <h6 className={`style text-white btn border text-center bg-${status}`}>{status}</h6>
                </div>
                <Card.Title>{serviceName}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card>
        </Col>
    );
};

export default BookListDetails;