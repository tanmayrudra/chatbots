import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="ml-64 flex-1">
        <MainContent />
      </div>
    </div>
  );
}

export default App;
