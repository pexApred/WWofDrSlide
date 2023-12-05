import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLES } from '../../utils/queries';
import FlipBook from '../../components/FlipBook/FlipBook';
import './HomePage.css';

const HomePage = () => {
    const { loading, error, data } = useQuery(QUERY_RIDDLES);

    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>Error! { error.message}</p>;

    const images = data.getRiddles.map(riddle => riddle.background_image);

    return (
        <>
            <div className='homeContent-wrapper'>
                    <div className='pHome'>
                        <p>
                            Welcome to The Wonderful World of Dr. Slide! 
                            To get started, please create a username and password in order to access the site. 
                            From there, you will be able to solve the riddles and see how well you can do overall.
                        </p>
                        <p>
                            Need help? You can ask for a hint and then try again. 
                            Alas, some are quite difficult so if the answer still evades you then click "I Give Up" to see the solution. 
                            It is highly encouraged that you try for a while before giving up as some require quite a lot of thought before the answer may become clearer. 
                        </p>
                        <p>
                            On this site, you will be also able to see your own personal statistics with regards to your success rate on the riddles. 
                            Are you amongst the best of the best? Your username will proudly be displayed on the Leader Board for all to see. 
                            Regardless of your success, please enjoy the process and confort in knowing you are exercising your brain.  
                        </p>
                </div>                
                <FlipBook className='flipBook' images={images} />
            </div>
        </>
    );
}


export default HomePage;
