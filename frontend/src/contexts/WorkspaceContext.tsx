import React, { createContext, useContext, useState, useEffect } from 'react';

interface Workspace {
  id: string;
  name: string;
  description: string;
}

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  isLoading: boolean;
  setCurrentWorkspace: (workspace: Workspace) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const mockWorkspaces = [
          {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Lunavo',
            description: 'Lunavo workspace for e-commerce operations',
          },
          {
            id: '00000000-0000-0000-0000-000000000002',
            name: 'Monarch',
            description: 'Monarch workspace for app management',
          },
          {
            id: '00000000-0000-0000-0000-000000000003',
            name: 'Lunabots',
            description: 'Lunabots workspace for bot management',
          },
          {
            id: '00000000-0000-0000-0000-000000000004',
            name: 'Hard Life Mode',
            description: 'Hard Life Mode workspace for social media',
          },
          {
            id: '00000000-0000-0000-0000-000000000005',
            name: 'Management',
            description: 'Management workspace for system oversight',
          },
        ];
        
        setWorkspaces(mockWorkspaces);
        
        if (mockWorkspaces.length > 0 && !currentWorkspace) {
          setCurrentWorkspace(mockWorkspaces[0]);
        }
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaces();
  }, [currentWorkspace]);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        isLoading,
        setCurrentWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
