import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container mt-auto">
          {/* <div className="text-center text-md-right"> */}
            <p className="mb-0 cr">
              © 2023 <span className="text-sz">T</span>he{" "}
              <span className="text-sz">W</span>onderful{" "}
              <span className="text-sz">W</span>orld of d
              <span className="text-sz">R</span> slide
            </p>
          {/* </div>           */}
      </footer>
    </>
  );
};

export default Footer;
