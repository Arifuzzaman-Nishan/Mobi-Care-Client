import React from 'react';
import { Link } from 'react-router-dom';

const FooterCol = (props) => {
    return (
        <div className="col-md-3">
            <h6 className="text-primary">{props.menuTitle ? props.menuTitle : " "}</h6>
            <ul className="list-unstyled mt-4">
                 {
                     props.menuItems.map((item, index) => <li key={index}>
                         {
                             item.link? <Link to={item.link} className="text-white">{item.name}</Link> : <p className="text-white">{item.name}</p>
                         }
                     </li>)
                 }
            </ul>
            {props.children && props.children}
        </div>
    );
};

export default FooterCol;