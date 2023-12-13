import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <Container fluid id='footer-container' className='mt-auto'>
        <Row className='footer'>
          <Col xs={12} md={4} className='text-center text-md-left md-0'>
            <p className='mb-0 cr'>Author: Michael H. Schecter, MD</p>
          </Col>
          <Col xs={12} md={4} className='text-center text-md-right'>
            <p className='mb-0 cr'>© 2023 The Wonderful World of dR slide</p>
          </Col>
          <Col xs={12} md={4} className='text-center md-0 '>
            <p className='mb-0 cr'><a href='https://emmanuellakis.dev'>Web Design: Emmanuel Lakis</a></p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
