import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';

const UserComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('id_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setEmail(decodedToken.data.email);
            setUsername(decodedToken.data.username);
        }
    }, []);

    return (
        <Row className='user-component-container'>
            <Col sm={10}>
                <div>
                    <h2>Username: {username}</h2>
                    <h4>Email: {email}</h4>
                </div>
            </Col>
        </Row>
    );
};

export default UserComponent;