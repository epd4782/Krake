import React, { useState, useRef, useEffect } from 'react';
import { useCommand } from '../../contexts/CommandContext';

interface CommandBarProps {
  workspace: {
    id: string;
    name: string;
  } | null;
}

const CommandBar: React.FC<CommandBarProps> = ({ workspace }) => {
  const [command, setCommand] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { sendCommand, isProcessing, lastResponse } = useCommand();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim() || !workspace) {
      return;
    }
    
    try {
      await sendCommand(command);
      setCommand('');
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  return (
    <div className={`relative ${isExpanded ? 'mb-16' : ''}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder={`Ask Krake something in ${workspace?.name || 'this workspace'}...`}
          className="krake-command-bar pr-24"
          disabled={isProcessing || !workspace}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {isProcessing ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-600"></div>
          ) : (
            <>
              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-gray-100"
                title="Voice command (coming soon)"
                disabled
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button
                type="submit"
                className="p-1.5 rounded-full hover:bg-gray-100"
                disabled={!command.trim() || !workspace}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </form>
      
      {isExpanded && lastResponse && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 p-4 z-10">
          <p className="text-gray-800">{lastResponse.response}</p>
          
          {lastResponse.actions.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Actions:</p>
              <div className="flex flex-wrap gap-2">
                {lastResponse.actions.map((action, index) => (
                  <span key={index} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    {action.type}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommandBar;
