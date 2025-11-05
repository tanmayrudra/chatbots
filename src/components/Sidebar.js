import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import ChatIcon from './icons/ChatIcon';
import ProjectsIcon from './icons/ProjectsIcon';
import ArtifactsIcon from './icons/ArtifactsIcon';
import StarredIcon from './icons/StarredIcon';
import RecentsIcon from './icons/RecentsIcon';
import DownArrowIcon from './icons/DownArrowIcon';
import ThreeDotsIcon from './icons/ThreeDotsIcon';
import UserIcon from './icons/UserIcon';

const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [recents, setRecents] = useState([
        { id: 'recents1', text: 'Melplatlib System Architecture D...' },
        { id: 'recents2', text: 'AI Internal Talent Matching System' },
        { id: 'recents3', text: 'AI Video Planner App Development' },
    ]);
    const [editing, setEditing] = useState(null);


    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const handleDelete = (id) => {
        setRecents(recents.filter(item => item.id !== id));
        setOpenMenu(null); // Close menu after deleting
    };

    const handleEdit = (item) => {
        setEditing(item);
        setOpenMenu(null); // Close menu after clicking edit
    };

    const handleSave = (e) => {
        e.preventDefault();
        setRecents(recents.map(item => item.id === editing.id ? editing : item));
        setEditing(null);
    };

    const renderMenu = (menuId, item) => {
        if (openMenu === menuId) {
            return (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                        <li><button onClick={() => handleEdit(item)} className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white">Edit</button></li>
                        <li><button onClick={() => handleDelete(item.id)} className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white">Delete</button></li>
                    </ul>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-64 bg-gray-800 flex flex-col fixed top-0 left-0 h-screen text-sm">
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-lg">
                        C
                    </div>
                    <span className="text-lg font-bold ml-2">MyEnd</span>
                </div>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mb-8 flex items-center justify-center">
                    <PlusIcon />
                    <span className="ml-2">New chat</span>
                </button>
                <div className="mt-8">
                    <ul>
                        {recents.map(item => (
                            <li key={item.id} className="mb-4 flex items-center justify-between whitespace-nowrap group">
                                {editing && editing.id === item.id ? (
                                    <form onSubmit={handleSave} className="w-full">
                                        <input 
                                            type="text" 
                                            value={editing.text}
                                            onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                                            className="bg-gray-700 text-white w-full"
                                            autoFocus
                                        />
                                    </form>
                                ) : (
                                    <a href="#" className="text-gray-300 hover:text-white flex-grow truncate">{item.text}</a>
                                )}
                                <div className="relative">
                                    <button onClick={() => toggleMenu(item.id)} className="text-gray-400 hover:text-white ml-2 opacity-0 group-hover:opacity-100">
                                        <ThreeDotsIcon />
                                    </button>
                                    {renderMenu(item.id, item)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="relative">
                {isProfileMenuOpen && (
                    <div className="absolute bottom-full mb-2 w-full px-2">
                        <div className="bg-gray-700 rounded-md shadow-lg">
                            <ul className="py-1">
                                <li><a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white">Profile</a></li>
                                <li><a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white">Settings</a></li>
                                <li><a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white">Log out</a></li>
                            </ul>
                        </div>
                    </div>
                )}
                <div className="p-4 border-t border-gray-700 cursor-pointer" onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">
                            <UserIcon />
                        </div>
                        <div className="ml-2">
                            <p className="text-sm font-bold">Esmondrio</p>
                            <p className="text-xs text-gray-400">Pro plan</p>
                        </div>
                        <div className="ml-auto">
                            <DownArrowIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
