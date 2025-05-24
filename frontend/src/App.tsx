import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import LunavoWorkspacePage from './pages/LunavoWorkspacePage';
import MonarchWorkspacePage from './pages/MonarchWorkspacePage';
import LunabotsWorkspacePage from './pages/LunabotsWorkspacePage';
import HardLifeModeWorkspacePage from './pages/HardLifeModeWorkspacePage';
import ManagementWorkspacePage from './pages/ManagementWorkspacePage';
import TodoWorkspacePage from './pages/TodoWorkspacePage';
import { AuthProvider } from './contexts/AuthContext';
import { WorkspaceProvider } from './contexts/WorkspaceContext';
import { CommandProvider } from './contexts/CommandContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <CommandProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="workspaces">
                <Route path="lunavo" element={<LunavoWorkspacePage />} />
                <Route path="monarch" element={<MonarchWorkspacePage />} />
                <Route path="lunabots" element={<LunabotsWorkspacePage />} />
                <Route path="hardlifemode" element={<HardLifeModeWorkspacePage />} />
                <Route path="management" element={<ManagementWorkspacePage />} />
                <Route path="todo" element={<TodoWorkspacePage />} />
              </Route>
            </Route>
          </Routes>
        </CommandProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
};

export default App;
