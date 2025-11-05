import React from 'react';
import SidebarToggleIcon from './icons/SidebarToggleIcon';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4">
            <button>
                <SidebarToggleIcon />
            </button>
            <div className="text-sm text-gray-400">
                Your plan ends in 0 days. <a href="#" className="text-blue-500 underline">Resubscribe</a>
            </div>
        </header>
    );
};

export default Header;
