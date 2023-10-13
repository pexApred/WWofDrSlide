import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer-container mt-auto '>
            <Container>
                <Row className='footer'>
                    <Col xs={12} md={4} className='text-center text-md-left md-0'>
                        <p className='mb-0 cr'>Author: Michael H. Schecter, MD</p>
                    </Col>
                    {/* <Col xs={12} md={4} className='text-center mb-3 mb-md-0 '>
                        <p className='mb-0 cr'>Illustrator: </p>
                    </Col> */}                    
                    <Col xs={12} md={4} className='text-center text-md-right'>
                        <p className='mb-0 cr'>Copyright © 2023 by Michael Schecter</p>
                    </Col>
                    <Col xs={12} md={4} className='text-center md-0 '>
                        <p className='mb-0 cr'>Web Design: Emmanuel (Manoli) Lakis</p>
                    </Col>


                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

