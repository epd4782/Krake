import React, { createContext, useContext, useState } from 'react';
import { useWorkspace } from './WorkspaceContext';

interface CommandAction {
  type: string;
  [key: string]: any;
}

interface CommandResponse {
  response: string;
  actions: CommandAction[];
}

interface CommandContextType {
  isProcessing: boolean;
  lastResponse: CommandResponse | null;
  sendCommand: (command: string) => Promise<CommandResponse>;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState<CommandResponse | null>(null);
  const { currentWorkspace } = useWorkspace();

  const sendCommand = async (command: string): Promise<CommandResponse> => {
    if (!currentWorkspace) {
      throw new Error('No workspace selected');
    }

    setIsProcessing(true);
    
    try {
      
      let response: CommandResponse;
      
      if (command.toLowerCase().includes('hello') || command.toLowerCase().includes('hi')) {
        response = {
          response: "Hello! How can I assist you today?",
          actions: [],
        };
      } else if (command.toLowerCase().includes('task') && command.toLowerCase().includes('create')) {
        response = {
          response: "I've created a new task for you.",
          actions: [
            {
              type: 'create_task',
              task_id: 't0000000-0000-0000-0000-000000000005',
              title: 'New task from command',
            }
          ],
        };
      } else if (command.toLowerCase().includes('shopify')) {
        response = {
          response: "I'm checking Shopify for you.",
          actions: [
            {
              type: 'open_integration',
              integration: 'shopify',
            }
          ],
        };
      } else if (command.toLowerCase().includes('gelato')) {
        response = {
          response: "I'm checking Gelato for you.",
          actions: [
            {
              type: 'open_integration',
              integration: 'gelato',
            }
          ],
        };
      } else if (command.toLowerCase().includes('binance')) {
        response = {
          response: "I'm checking Binance for you.",
          actions: [
            {
              type: 'open_integration',
              integration: 'binance',
            }
          ],
        };
      } else if (command.toLowerCase().includes('agent') || command.toLowerCase().includes('sintra')) {
        response = {
          response: "I'm connecting you with the Sintra AI agents.",
          actions: [
            {
              type: 'open_agents',
            }
          ],
        };
      } else {
        response = {
          response: "I'm not sure how to process that command. Could you please rephrase?",
          actions: [],
        };
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLastResponse(response);
      return response;
    } catch (error) {
      console.error('Command error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <CommandContext.Provider
      value={{
        isProcessing,
        lastResponse,
        sendCommand,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export const useCommand = () => {
  const context = useContext(CommandContext);
  if (context === undefined) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
};
