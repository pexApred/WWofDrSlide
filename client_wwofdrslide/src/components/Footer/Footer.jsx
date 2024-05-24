import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container mt-auto">
        <p className="mb-0 cr">
          <a className="f-contact" href="https://emmanuellakis.dev/">
            © 2023 Emmanuel Lakis
          </a>
        </p>
        <p className="c-r">
          <a className="f-contact" href="https://forms.gle/mi7uqhQUuc7crBtr7">
            {" "}
            Contact Us{" "}
          </a>
        </p>

        <div class="footer-top">
          <div class="contact-info">
            <h4>Contact Us</h4>
            <p>1234 Street Name, City, State</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@example.com</p>
          </div>
          <div class="quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About The Author</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="https://forms.gle/mi7uqhQUuc7crBtr7">Contact Us</a>
              </li>
            </ul>
          </div>
              <div class="newsletter-signup">
      <h4>Subscribe to Our Newsletter</h4>
      <form>
        <input type="email" placeholder="Enter your email"/>
        <button type="submit">Subscribe</button>
      </form>
    </div>
        </div>
        <div class="footer-bottom">
          <div class="social-media">
            <a href="#">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
          <div class="legal-info">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;