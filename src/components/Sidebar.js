import React, { useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import DownArrowIcon from "./icons/DownArrowIcon";
import ThreeDotsIcon from "./icons/ThreeDotsIcon";
import UserIcon from "./icons/UserIcon";
import { motion } from "framer-motion";
import useStore from "../store";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  // Zustand store integration
  const sessions = useStore(state => state.sessions);
  const startNewSession = useStore(state => state.startNewSession);
  const switchSession = useStore(state => state.switchSession);
  const deleteSession = useStore(state => state.deleteSession); // Get deleteSession from store
  const userPlan = useStore(state => state.userPlan);
  const setUserPlan = useStore(state => state.setUserPlan);

  const handleNewChat = () => {
    startNewSession();
  };

  const togglePlan = () => {
    const newPlan = userPlan === 'free' ? 'premium' : 'free';
    setUserPlan(newPlan);
  }

  const toggleMenu = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const handleDelete = (sessionId) => {
    deleteSession(sessionId); // Call store action
    setOpenMenu(null); // Close menu after deleting
  };

  const renderMenu = (menuId, session) => {
    if (openMenu === menuId) {
      return (
        <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li>
              <button
                onClick={() => handleDelete(session.id)}
                className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
              >
                Delete
              </button>
            </li>
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
          <span className="text-lg font-bold ml-2">Chatbots</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
          onClick={handleNewChat}
          className="w-full relative bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mb-8 flex items-center justify-center overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            <PlusIcon />
            <span className="ml-2">New chat</span>
          </span>
          <span className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-[length:300%_300%] animate-[shine_3s_linear_infinite]"></span>
        </motion.button>
        <div className="mt-8">
          <ul>
            {sessions.map((session) => (
              <li
                key={session.id}
                className="mb-4 flex items-center justify-between whitespace-nowrap group"
              >
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); switchSession(session.id); }}
                  className="text-gray-300 hover:text-white flex-grow truncate"
                >
                  {session.title || `Chat ${session.id}`}
                </a>
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(session.id)}
                    className="text-gray-400 hover:text-white ml-2 opacity-0 group-hover:opacity-100"
                  >
                    <ThreeDotsIcon />
                  </button>
                  {renderMenu(session.id, session)}
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
                <li>
                  <button
                    onClick={togglePlan}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                  >
                    {`Switch to ${userPlan === 'free' ? 'Premium' : 'Free'}`}
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div
          className="p-4 border-t border-gray-700 cursor-pointer"
          onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">
              <UserIcon />
            </div>
            <div className="ml-2">
              <p className="text-sm font-bold">Esmondrio</p>
              <p className="text-xs text-gray-400 capitalize">{userPlan} plan</p>
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
