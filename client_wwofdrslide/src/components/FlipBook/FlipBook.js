import React, { useState, useEffect } from 'react';

const FlipBook = ({ images }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentPage((prevPage) => (prevPage + 1) % images.length);
                setIsFlipping(false);
            }, 1000); // After 1 second (duration of flip animation)
        }, 2000); // Change pages every 3 seconds (1 second for flip + 2 seconds pause)

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="homebook">
            <div className={`page front ${isFlipping ? 'flipping' : ''}`}>
                <img src={images[currentPage]} alt={`Riddle Page ${currentPage}`} />
            </div>
            {/* <div className={`page back ${isFlipping ? 'flipping' : ''}`}>
                <img src={images[currentPage + 1]} alt={`Riddle Page ${currentPage + 1}`} />
            </div> */}
        </div>
    );
};

export default FlipBook;
