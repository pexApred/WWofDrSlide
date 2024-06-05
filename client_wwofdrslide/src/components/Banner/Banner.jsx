import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="cta-buttons">
        <a
          className="purchase-link"
          href="https://www.warrenpublishing.net/store/p502/PRE-ORDER_The_Wonderful_World_of_dR_slide%3A_A_Book_of_Riddles_for_All_%28hard_cover%29_by_Michael_Schecter%2C_MD.html"
        >
          Buy Now
        </a>
        <a className="review-link" href="https://www.goodreads.com/book/show/205433385-the-wonderful-world-of-dr-slide?from_search=true&from_srp=true">
          Review on Goodreads
        </a>
      </div>
    </div>
  );
};

export default Banner;
