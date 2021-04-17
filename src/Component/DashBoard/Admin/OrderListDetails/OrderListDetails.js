import React, { useState } from 'react';

const OrderListDetails = ({ allOrder }) => {
    console.log(allOrder)
    const {_id, name, email, serviceName, funding } = allOrder;

    const handleChange = (e) => {
        console.log(e.target.name,e.target.value);

        fetch(`http://localhost:5000/update/${_id}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status:e.target.value})
        })
        .then(res => res.json())
        .then(data => {
            alert('successfully updated');
            window.location.reload();
        })

    }

    return (
        <tbody>
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{serviceName}</td>
                <td>{funding}</td>
                <td>
                    <select onChange={handleChange} className='form-control' id="cars" name="status">
                        <option className='text-danger' value="pending">Pending</option>
                        <option className='text-warning' value="ongoing">On going</option>
                        <option className='text-success' value="done">Done</option>
                    </select>
                </td>
            </tr>
        </tbody>
    );
};

export default OrderListDetails;