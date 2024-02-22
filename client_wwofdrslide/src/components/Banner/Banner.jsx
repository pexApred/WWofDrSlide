import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <p className="banner-text">
        Want to unlock the riddles? Purchase the book {' '}
        <a
          className="purchase-link"
          href="https://www.warrenpublishing.net/store/p502/PRE-ORDER_The_Wonderful_World_of_dR_slide%3A_A_Book_of_Riddles_for_All_%28hard_cover%29_by_Michael_Schecter%2C_MD.html"
        > here
        </a>
      </p>
    </div>
  );
};

export default Banner;
