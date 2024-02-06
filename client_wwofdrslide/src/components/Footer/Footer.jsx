import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container mt-auto">
          <p className="mb-0 cr"><a className='f-contact' href="https://emmanuellakis.dev/">
            © 2023 Emmanuel Lakis
          </a></p>
          <p className="c-r"><a className='f-contact' href="https://forms.gle/mi7uqhQUuc7crBtr7"> Contact Us </a></p>
      </footer>
    </>
  );
};

export default Footer;
