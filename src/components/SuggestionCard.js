import React from 'react';

const SuggestionCard = ({ icon, text, badge }) => {
    return (
        <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <span>{text}</span>
            {badge && <span className="ml-2 bg-orange-500 text-xs font-bold rounded-full px-2 py-1">{badge}</span>}
        </button>
    );
};

export default SuggestionCard;
