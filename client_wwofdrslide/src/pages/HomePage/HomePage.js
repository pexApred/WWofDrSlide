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
                                I say to you, Welcome, <br/>Come one and come all!<br/>
                                For this world is a wonder, <br/>It's large and it's small.<br/>
                                A book full of riddles, <br/>Some short and some tall,<br/>
                                The stories within often rhyme, but not all.<br/>
                                So, check your solutions, <br/>perhaps you're the best,<br/>
                                To see how you did when compared to the rest.<br/>
                            </p>
                        </div>
                        <img src="../WWofDrSlide.gif" className='gif' alt="Dr. Slide" />
                        <div>
                            <p>
                                Alas, some are tricky, a challenge at hand.<br/>
                                But before you give up, ask for hints if you can. <br/>
                                Each book has a pass code, allotting you tokens,<br/>
                                To purchase more hints if your thinking cap's broken.<br/>
                                But enough of this intro, it's time to begin.<br/>
                                I hope you enjoy it and share with a friend!<br/>
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