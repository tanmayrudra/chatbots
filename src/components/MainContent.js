import React, { useState, useEffect } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import PromptInput from './PromptInput';
import UserIcon from './icons/UserIcon';
import SparklesIcon from './icons/SparklesIcon';
import useStore from '../store';

const MainContent = () => {
  const [isTyping, setIsTyping] = useState(false);

  // Zustand store integration
  const { sessions, currentSessionId, startNewSession, addMessage, userPlan } = useStore();
  const messages = useStore(state => state.getCurrentMessages());

  useEffect(() => {
    // Start a new session on initial load if none exists
    if (!currentSessionId) {
      startNewSession();
    }
  }, [currentSessionId, startNewSession]);

  const userMessagesCount = messages.filter(m => m.sender === 'user').length;
  const isLimitReached = userPlan === 'free' && userMessagesCount >= 10;

  const handleSend = (prompt) => {
    if (isLimitReached) return;

    const newUserMessage = { text: prompt, sender: 'user' };
    addMessage(newUserMessage);
    setIsTyping(false);

    setTimeout(() => {
      const newAiMessage = { text: `"${prompt}"`, sender: 'ai' };
      addMessage(newAiMessage);
    }, 500);
  };

  const handleInputChange = (value) => {
    if (value.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const showWelcome = messages.length === 0 && !isTyping;

  return (
    <div className="flex-1 flex flex-col bg-gray-900 text-sm">
      <Header />
      <main className="flex-1 flex flex-col items-center p-4 w-full relative">
        {showWelcome ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-3xl mx-auto mt-8">
              <PromptInput onSend={handleSend} onInputChange={handleInputChange} disabled={isLimitReached} />
            </div>
          </div>
        ) : (
          <>
            <div className="w-full max-w-3xl flex-1 pb-24">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`my-4 flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.sender === 'user' ? (
                    <>
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}>
                        {msg.sender === 'user' ? <UserIcon /> : <SparklesIcon />}
                      </div>
                      <div className="ml-4">
                        <p className="text-white">{msg.text}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mr-4">
                        <p className="text-white">{msg.text}</p>
                      </div>
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}>
                        {msg.sender === 'user' ? <UserIcon /> : <SparklesIcon />}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="fixed w-[83%] bottom-0 right-0 bg-gray-900 p-4 z-20 pt-0">
              {isLimitReached && (
                <div className="text-center text-yellow-500 mb-2">
                  You have reached your 10-prompt limit for the free plan. Please upgrade to premium for unlimited prompts.
                </div>
              )}
              <PromptInput onSend={handleSend} onInputChange={handleInputChange} disabled={isLimitReached} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MainContent;