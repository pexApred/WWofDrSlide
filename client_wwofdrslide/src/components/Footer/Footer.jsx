import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container mt-auto ">
          <Row className="footer">
            {/* <Col xs={12} md={4} className="text-center text-md-left md-0">
              <p className="mb-0 cr">Author: Michael H. Schecter, MD</p>
            </Col> */}
            <Col xs={12} md={4} className="text-center text-md-right">
              <p className="mb-0 cr">© 2023 <span className='text-sz'>T</span>he <span className='text-sz'>W</span>onderful <span className='text-sz'>W</span>orld of d<span className='text-sz'>R</span> slide</p>
            </Col>
            {/* <Col xs={12} md={4} className="text-center md-0 ">
              <p className="mb-0 cr">
                <a href="https://emmanuellakis.dev">
                  Web Design: Emmanuel Lakis
                </a>
              </p>
            </Col> */}
          </Row>
      </footer>
    </>
  );
};

export default Footer;
