import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <div className="quick-links">
          <div className="footer-left">
            <h1 className="sitemap">Sitemap</h1>
            <a className="f-contact" href="/abouttheauthor">
              About The Author
            </a>
            <a className="f-contact" href="/profile">
              My Profile
            </a>
            <a className="f-contact" href="/riddles">
              Solve a Riddle
            </a>
            <a className="f-contact" href="/leaderboard">
              Leaderboard
            </a>
          </div>
          <div className="footer-right">
            <h1 className="q-links">Quick Links</h1>
            <a
              className="f-contact"
              href="https://www.warrenpublishing.net/store/p502/PRE-ORDER_The_Wonderful_World_of_dR_slide%3A_A_Book_of_Riddles_for_All_%28hard_cover%29_by_Michael_Schecter%2C_MD.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Warren Publishing
            </a>
            <a
              className="f-contact"
              href="https://www.amazon.com/Wonderful-World-dR-slide-Riddles/dp/1960146866"
              target="_blank"
              rel="noopener noreferrer"
            >
              Purchase on Amazon
            </a>
            <a
              className="f-contact"
              href="https://www.goodreads.com/book/show/205433385-the-wonderful-world-of-dr-slide?from_search=true&from_srp=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              Review on Goodreads
            </a>
            <a
              className="f-contact"
              href="https://forms.gle/mi7uqhQUuc7crBtr7"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </div>
        </div>
        <svg width="100%" height="20">
          <line
            x1="0"
            y1="10"
            x2="100%"
            y2="10"
            stroke="rgba(62, 78, 66, .5)"
            strokeWidth="2"
          />
        </svg>
        <div className="footer-info">
          <p className="f-contact">All Rights Reserved © 2023</p>
          <p className="cr">
            <a
              className="f-contact"
              href="https://emmanuellakis.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Designed & Developed by Emmanuel Lakis
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
