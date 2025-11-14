import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';
import PlusIcon from './icons/PlusIcon';
import SearchIcon from './icons/SearchIcon';
import CodeIcon from './icons/CodeIcon';

const PromptInput = ({ onSend, onInputChange, disabled }) => { // Accept disabled prop
    const [inputValue, setInputValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuOptions = [
        { icon: <SearchIcon />, name: 'Image Search' },
        { icon: <CodeIcon />, name: 'Prompt to Code' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && !disabled) {
            onSend(inputValue.trim());
            setInputValue('');
            onInputChange('');
        }
    };

    const handleTextChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onInputChange(value);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto my-8">
            {isMenuOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 flex justify-center">
                    <div className="bg-gray-700 rounded-lg p-2 flex items-center space-x-2">
                        {menuOptions.map((option) => (
                            <button key={option.name} type="button" className="flex items-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">
                                {option.icon}
                                <span className="ml-2">{option.name}</span>
                            </button>
                        ))}
                         <button type="button" className="flex items-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                            <span className="ml-2">Video Vibe</span>
                        </button>
                    </div>
                </div>
            )}
            <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-500 text-white font-bold p-2 rounded-full z-10"
                disabled={disabled}
            >
                <PlusIcon />
            </button>
            <input
                type="text"
                value={inputValue}
                onChange={handleTextChange}
                placeholder={disabled ? "Prompt limit reached" : "How can I help you today?"}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-4 pl-14 pr-14 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={disabled}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-500 text-white font-bold p-2 rounded-full disabled:opacity-50" disabled={disabled}>
                <SendIcon />
            </button>
        </form>
    );
};

export default PromptInput;
