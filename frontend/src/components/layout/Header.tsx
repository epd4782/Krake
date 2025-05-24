import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import CommandBar from '../ui/CommandBar';

const Header: React.FC = () => {
  const location = useLocation();
  const { currentWorkspace } = useWorkspace();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const getPageTitle = () => {
    if (location.pathname === '/') {
      return 'Dashboard';
    }
    
    if (location.pathname.includes('/workspaces/')) {
      const workspace = location.pathname.split('/workspaces/')[1];
      
      switch (workspace) {
        case 'lunavo':
          return 'Lunavo Workspace';
        case 'monarch':
          return 'Monarch Workspace';
        case 'lunabots':
          return 'Lunabots Workspace';
        case 'hardlifemode':
          return 'Hard Life Mode Workspace';
        case 'management':
          return 'Management Workspace';
        case 'todo':
          return 'To Do Workspace';
        default:
          return 'Workspace';
      }
    }
    
    return 'Krake Orchestrator';
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
          
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="relative">
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="px-4 py-2 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm text-gray-700">New task assigned to Buddy</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm text-gray-700">Shopify order #1234 completed</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-50">
                      <p className="text-sm text-gray-700">System update completed</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <a href="#" className="text-xs text-primary-600 hover:text-primary-800">View all notifications</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Command Bar */}
        <CommandBar workspace={currentWorkspace} />
      </div>
    </header>
  );
};

export default Header;
