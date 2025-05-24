import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWorkspace } from '../../contexts/WorkspaceContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { workspaces } = useWorkspace();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600">Krake Orchestrator</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <Link
          to="/"
          className={`flex items-center px-4 py-2 text-gray-700 ${
            location.pathname === '/' ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Dashboard
        </Link>
        
        <div className="mt-4">
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Workspaces
          </h2>
          
          <div className="mt-2">
            <Link
              to="/workspaces/lunavo"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                isActive('/workspaces/lunavo') ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              Lunavo
            </Link>
            
            <Link
              to="/workspaces/monarch"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                isActive('/workspaces/monarch') ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Monarch
            </Link>
            
            <Link
              to="/workspaces/lunabots"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                isActive('/workspaces/lunabots') ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Lunabots
            </Link>
            
            <Link
              to="/workspaces/hardlifemode"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                isActive('/workspaces/hardlifemode') ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Hard Life Mode
            </Link>
            
            <Link
              to="/workspaces/management"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                isActive('/workspaces/management') ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Management
            </Link>
            
            <Link
              to="/workspaces/todo"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                isActive('/workspaces/todo') ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              To Do
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Demo User</p>
            <p className="text-xs text-gray-500">demo@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
