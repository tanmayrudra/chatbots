import React from 'react';
import Header from './Header';
import Welcome from './Welcome';
import PromptInput from './PromptInput';
import SuggestionCard from './SuggestionCard';
import SearchIcon from './icons/SearchIcon';
import CodeIcon from './icons/CodeIcon';
import WriteIcon from './icons/WriteIcon';
import StrategizeIcon from './icons/StrategizeIcon';
import LearnIcon from './icons/LearnIcon';
import AppsIcon from './icons/AppsIcon';

const MainContent = () => {
  return (
    <div className="flex-1 flex flex-col bg-gray-900 justify-center items-center min-h-screen text-sm">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <Welcome />
        <PromptInput />
        <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
          <SuggestionCard icon={<SearchIcon />} text="Research" />
          <SuggestionCard text="Claude Sonnet 4" badge="1" />
          <SuggestionCard icon={<CodeIcon />} text="Code" />
          <SuggestionCard icon={<WriteIcon />} text="Write" />
          <SuggestionCard icon={<StrategizeIcon />} text="Strategize" />
        </div>
        <div className="flex gap-4 mt-4">
            <SuggestionCard icon={<LearnIcon />} text="Learn" />
            <SuggestionCard icon={<AppsIcon />} text="From your apps" />
        </div>
      </main>
    </div>
  );
};

export default MainContent;