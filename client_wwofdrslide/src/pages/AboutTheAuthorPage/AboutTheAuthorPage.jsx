import React, { useState, useEffect, useRef } from "react";
import "./AboutTheAuthorPage.css";
import { useTransition, animated } from "@react-spring/web";

const AboutTheAuthorPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const slides = [
    "../../book_signing.jpeg",
    "../../head_shot.jpeg",
    "../../mowgli_book.jpeg",
  ];

  const transitions = useTransition(activeIndex, {
    from: { opacity: 0, display: "none" },
    enter: { opacity: 1, display: "block" },
    leave: { opacity: 0, display: "none" },
  });

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleSlideChange = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
    startInterval();
  };

  const nextSlide = () => {
    handleSlideChange((activeIndex + 1) % slides.length);
  };

  const previousSlide = () => {
    handleSlideChange((activeIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="aboutAuthor">
      <div className="carousel-container">
        <div onClick={previousSlide} className="btn-slide prev">
          &#10094;
        </div>
        <div className="slides">
          {transitions((styles, item) => (
            <animated.div
              key={item}
              className="slide"
              style={{
                ...styles,
                backgroundImage: `url(${slides[item]})`,
              }}
            />
          ))}
        </div>
        <div onClick={nextSlide} className="btn-slide next">
          &#10095;
        </div>
      </div>
      <div className="bio">
        <p className="aInfo">
          <span className="author">MICHAEL H. SCHECTER</span> is an optimistic,
          extroverted, happy go-lucky guy who enjoys the little things in life.
          Born and raised in Rome, Georgia, he now lives in Charlotte, North
          Carolina, with his wife Caline, dog Mowgli, and two cats Jaxon and
          Brynn. In his free time, Michael is often found playing video games
          with friends, tennis with his wife, or playing the piano. Michael
          works as a neurologist and is also the son of a neurologist. As such,
          he has an intimate understanding of the importance of brain health,
          and what better way to exercise the mind than with brain games like
          riddles! Realizing he had a knack for making them, Michael now
          thoroughly enjoys watching friends and family solve them.
        </p>
      </div>
    </div>
  );
};

export default AboutTheAuthorPage;
