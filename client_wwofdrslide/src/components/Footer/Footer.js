import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer mt-auto py-3' bg='dark' variant='dark' style={{ backgroundColor: '' }}>
            <Container className="flex-grow-1">
                <Row>
                    <Col className='text-center text-sm-left'>
                        {/* <Image src="./journeyverse-logo.png" alt="Logo" className="logo" fluid /> */}
                    </Col>
                    <Col xs={12} sm={4} className="text-center">
                        <p className="footer-text">Wonderful World of Dr. Slide ©2023</p>
                    </Col>
                    <Col xs={12} sm={4} className="text-center text-sm-right">
                        <p>Author: {''}
                            <a>Michael Schecter</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
