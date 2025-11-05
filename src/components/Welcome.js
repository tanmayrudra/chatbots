import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Welcome = () => {
    return (
        <div className="text-center">
            <h1 className="text-xl font-medium mb-4 flex items-center justify-center">
                <span className="text-orange-400"><SparklesIcon /></span>
                <span className="ml-2">What's new, Esmondrio?</span>
            </h1>
        </div>
    );
};

export default Welcome;
