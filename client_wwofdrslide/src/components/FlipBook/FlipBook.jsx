import React, { useState, useEffect } from 'react';
import './FlipBook.css';

const FlipBook = ({ images }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentPage((prevPage) => (prevPage + 1) % images.length);
                setIsFlipping(false);
            }, 1000);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="flipbook">
            <img
                src={images[currentPage]}
                alt={`Riddle Page ${currentPage}`}
                className={`page ${isFlipping ? 'flipping' : ''}`}
            />
        </div>
    );
};

export default FlipBook;
