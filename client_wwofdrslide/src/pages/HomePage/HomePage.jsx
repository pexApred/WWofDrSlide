import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_RIDDLES } from "../../utils/queries";
// import FlipBook from "../../components/FlipBook/FlipBook";
import "./HomePage.css";

const HomePage = () => {
  const { loading, error } = useQuery(QUERY_RIDDLES);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>Error! {error.message}</p>;

  // const images = data.getRiddles.map((riddle) => riddle.background_image);

  return (
    <>
      <div className="homeContent-wrapper">
      <img
          src="../../cover dr2.jpeg"
          alt="Book Cover"
          className="book-cover"
        ></img>
        <div className="pHome">
          <p>
            <span className="headings">Welcome to <span className="text-b">T</span>HE <span className="text-b">W</span>ONDERFUL <span className="text-b">W</span>ORLD OF d<span className="text-b">R</span> SLIDE!</span>
            <br /> To get started, please create a username and password in
            order to access the site. From there, you will be able to solve the
            riddles and see how well you do overall.
          </p>

          <p>
            <span className="headings">
              Need help? You can ask for a hint and then try again.
            </span>
            <br /> Alas, some are quite difficult so if the answer still evades
            you then click “I Give Up” to see the solution. It is highly
            encouraged that you try for a while before giving up as some require
            quite a lot of thought before the answer may become clear.
          </p>

          <p id='last-p'>
            <span className="headings">Are you amongst the best of the best?</span>
            <br />
            On this site, you will also be able to see your own personal
            statistics with regard to your success rate on the riddles. Your
            username will proudly be displayed on the Leader Board for all to
            see. Regardless of your success, please enjoy the process and
            comfort in knowing you are exercising your brain!
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
