import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_RIDDLES } from "../../utils/queries";
import "./HomePage.css";

const HomePage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { loading, error } = useQuery(QUERY_RIDDLES);

  useEffect(() => {
    const img = new Image();
    img.src = "../../cover-dr2.jpeg";
    img.onload = () => setImageLoaded(true);
  }, []);

  if (loading || !imageLoaded) return <p className="spinner"></p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <>
      <div className="homeContent-wrapper">
        <img
          src="../../cover-dr2.jpeg"
          alt="Book Cover"
          className="book-cover"
        ></img>
        <div className="book-line"></div>
        <div className="pHome">
          <p>
            <span className="headings">
              Welcome to T<span className="text-b">HE </span>W<span className="text-b">ONDERFUL </span>W<span className="text-b">ORLD OF D</span>R<span className="text-b"> SLIDE!</span>
            </span>
            <br /> To access the site, please create a username and
            password. From there, embark on a riddle-solving journey and see how
            well you do overall.
          </p>
          <p>
            <span className="headings">
              Need help? You can ask for a hint and then try again.
            </span>
            <br /> Some are quite difficult and may still evade you despite
            getting a hint. After a hint has been requested, click "I Give Up"
            to see the solution.
          </p>
          <p id="last-p">
            <span className="headings">
              Are you amongst the best of the best?
            </span>
            <br />
            The Leaderboard displays the top scores overall. Solving a riddle
            without a hint awards 2 points. Solving a riddle with a hint awards
            1 point. Regardless of success, please enjoy the process and comfort
            in knowing you are exercising your brain!
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
