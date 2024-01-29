import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <p className="banner-text">
        Purchase a{" "}
        <a
          className="purchase-link-hard"
          href="https://www.warrenpublishing.net/store/p502/PRE-ORDER_The_Wonderful_World_of_dR_slide%3A_A_Book_of_Riddles_for_All_%28hard_cover%29_by_Michael_Schecter%2C_MD.html"
        >
          hard cover
        </a>{" "}
        or{"  "}
        <a
          className="purchase-link-soft"
          href="https://www.warrenpublishing.net/store/p503/PRE-ORDER_The_Wonderful_World_of_dR_slide%3A_A_Book_of_Riddles_for_All_%28soft_cover%29_by_Michael_Schecter%2C_MD.html"
        >
          soft cover
        </a>{" "}
        of <br />
        <span className="banner-title">
          T<span className="text-b">HE </span>W
          <span className="text-b">ONDERFUL </span>W
          <span className="text-b">ORLD OF D</span>R
          <span className="text-b"> SLIDE: A BOOK OF RIDDLES FOR ALL</span>
        </span>
      </p>
    </div>
  );
};

export default Banner;
