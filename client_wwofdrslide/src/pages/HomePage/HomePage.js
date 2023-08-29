import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import './HomePage.css';

const HomePage = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row">
                    <h1>Wonderful World of Dr. Slide</h1>
                    <div className="col">
                        <div>
                            <p>
                                I say to you, Welcome, Come one and come all!
                                For this world is a wonder, It's large and it's small.
                                Abook full of riddles, Some short and some tall,
                                The stories within often rhyme, but not all.
                                So, check your solutions, perhaps you're the best,
                                To see how you did when compared to the rest.
                            </p>
                        </div>
                        <img src="../WWofDrSlide.gif" className='gif' alt="Dr. Slide" />
                        <div>
                            <p>
                                Alas, some are tricky, a challenge at hand.
                                But before you give up, ask for hints if you can. Each book has a pass code, allotting you tokens,
                                To purchase more hints if your thinking cap's broken.
                                But enough of this intro, it's time to begin.
                                I hope you enjoy it and share with a friend!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;