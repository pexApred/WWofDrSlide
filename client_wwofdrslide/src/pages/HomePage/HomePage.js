import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLES } from '../../utils/queries';
import FlipBook from '../../components/FlipBook/FlipBook';
import './HomePage.css';

const HomePage = () => {
    const { loading, error, data } = useQuery(QUERY_RIDDLES);

    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>Error! {error.message}</p>;

    const images = data.getRiddles.map(riddle => riddle.background_image);

    return (
        <>
            <NavBar />
            <div className='homeContent-wrapper'>
                    <div className='pHome'>
                        <p>
                            I say to you, Welcome, <br />Come one and come all!<br />
                            For this world is a wonder, <br />It's large and it's small.<br />
                            A book full of riddles, <br />Some short and some tall,<br />
                            The stories within often rhyme, but not all.<br />
                            So, check your solutions, <br />perhaps you're the best,<br />
                            To see how you did when compared to the rest.<br />
                        </p>
                        <p>
                            Alas, some are tricky, a challenge at hand.<br />
                            But before you give up, ask for hints if you can. <br />
                            Each book has a pass code, allotting you tokens,<br />
                            To ask for more more hints if your thinking cap's broken.<br />
                            But enough of this intro, it's time to begin.<br />
                            I hope you enjoy it and share with a friend!<br />
                        </p>
                </div>                
                <FlipBook className='flipBook' images={images} />
            </div>
        </>
    );
}


export default HomePage;
