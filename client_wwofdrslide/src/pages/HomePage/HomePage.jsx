import React, {useState, useEffect} from "react";
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
            <span className="headings">Welcome to T<span className="text-b">HE </span>W<span className="text-b">ONDERFUL </span>W<span className="text-b">ORLD OF D</span>R <span className="text-b">SLIDE!</span></span>
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
