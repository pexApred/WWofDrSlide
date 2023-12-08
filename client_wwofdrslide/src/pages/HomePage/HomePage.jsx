import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLES } from '../../utils/queries';
import FlipBook from '../../components/FlipBook/FlipBook';
import './HomePage.css';

const HomePage = () => {
  const { loading, error, data } = useQuery(QUERY_RIDDLES);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>Error! {error.message}</p>;

  const images = data.getRiddles.map((riddle) => riddle.background_image);

  return (
    <>
      <div className='homeContent-wrapper'>
        <div className='pHome'>
          {/* <p>
                            Welcome to The Wonderful World of Dr. Slide!<br/> 
                            To begin your journey, create a profile. Use the book to view the riddles and submit your answers on the corresponding riddle page.
                        </p>
                        <p>
                            Need help? You can ask for a hint and then try again. <br/> 
                            Alas, some are quite difficult so if the answer still evades you then click 'I Give Up' to see the solution. 
                            It is highly encouraged that you try for a while before giving up as some require quite a lot of thought. 
                        </p>
                        <p>
                            Are you amongst the best of the best? <br/>On this site, you will be also able to see your own personal statistics with regards to your success rate on the riddles. 
                            Your username will proudly be displayed on the Leader Board for all to see. 
                            Regardless of your success, please enjoy the process and comfort in knowing you are exercising your brain.  
                        </p> */}
          <p>Welcome to The Wonderful World of Dr. Slide!</p>
          <p>
            Embark on a Riddle Journey with Your Own Book! Purchase Dr.
            Slide's Riddle Book and dive into a captivating world of puzzles.
            Use the book to explore riddles and submit your answers on our site.
          </p>

          <p>
            Hints and Solutions at Your Fingertips!
            <br />
            Stuck on a riddle? Request a hint, give it another go, or reveal the
            solution if needed. Remember, perseverance is key!
          </p>

          <p>
            Track Your Progress and Compete on the Leader Board!
            <br />
            Check your personal stats and see how you rank among other riddle
            enthusiasts. It's all about challenging yourself and enjoying the
            journey of discovery.
          </p>

          <p>Ready to test your wit? Let's solve some riddles!</p>
        </div>
        <FlipBook className='flipBook' images={images} />
      </div>
    </>
  );
};

export default HomePage;
