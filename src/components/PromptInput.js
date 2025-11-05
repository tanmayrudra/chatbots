import React from 'react';
import SendIcon from './icons/SendIcon';

const PromptInput = () => {
    return (
        <div className="relative w-full max-w-3xl mx-auto my-8">
            <input
                type="text"
                placeholder="How can I help you today?"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-4 pl-4 pr-14 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-500 text-white font-bold p-2 rounded-full">
                <SendIcon />
            </button>
        </div>
    );
};

export default PromptInput;
