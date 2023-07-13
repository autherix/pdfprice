import React from 'react';

import { useState, useEffect } from 'react';

const NotFound = () => {
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (counter === 1) {
                window.location.replace('/');
            } else {
                setCounter(counter - 1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [counter]);

    return (
        <div>
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <p>Going to the home page in {counter} seconds</p>
        </div>
    );
};

export default NotFound;
