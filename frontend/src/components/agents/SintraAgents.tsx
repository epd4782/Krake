import React, { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

interface Folder {
  id: string;
  name: string;
  agentId: string;
}

interface FolderEntry {
  id: string;
  folderId: string;
  title: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

interface SintraAgentsProps {
  workspaceId?: string;
}

const SintraAgents: React.FC<SintraAgentsProps> = ({ workspaceId }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [folderEntries, setFolderEntries] = useState<FolderEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'agents' | 'folders' | 'entries'>('agents');
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [columns, setColumns] = useState<string[]>(['Title', 'Status', 'Created At', 'Actions']);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const mockAgents: Agent[] = [
          {
            id: '1',
            name: 'Buddy',
            description: 'Content creation specialist',
            avatar: '/avatars/buddy.png',
          },
          {
            id: '2',
            name: 'Dexter',
            description: 'Data analysis expert',
            avatar: '/avatars/dexter.png',
          },
          {
            id: '3',
            name: 'Milli',
            description: 'Marketing strategist',
            avatar: '/avatars/milli.png',
          },
          {
            id: '4',
            name: 'Vizzy',
            description: 'Visual design specialist',
            avatar: '/avatars/vizzy.png',
          },
          {
            id: '5',
            name: 'Penn',
            description: 'Content planning expert',
            avatar: '/avatars/penn.png',
          },
          {
            id: '6',
            name: 'Commet',
            description: 'Social media specialist',
            avatar: '/avatars/commet.png',
          },
          {
            id: '7',
            name: 'Gigi',
            description: 'Graphic design expert',
            avatar: '/avatars/gigi.png',
          },
          {
            id: '8',
            name: 'Cassie',
            description: 'Customer service specialist',
            avatar: '/avatars/cassie.png',
          },
          {
            id: '9',
            name: 'Emmie',
            description: 'Email marketing expert',
            avatar: '/avatars/emmie.png',
          },
          {
            id: '10',
            name: 'Seomi',
            description: 'SEO optimization specialist',
            avatar: '/avatars/seomi.png',
          },
          {
            id: '11',
            name: 'Scouty',
            description: 'Market research expert',
            avatar: '/avatars/scouty.png',
          },
          {
            id: '12',
            name: 'Soshie',
            description: 'Social media engagement specialist',
            avatar: '/avatars/soshie.png',
          },
        ];
        
        setAgents(mockAgents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleAgentSelect = async (agent: Agent) => {
    setSelectedAgent(agent);
    setView('folders');
    setIsLoading(true);
    
    try {
      const mockFolders: Folder[] = [
        {
          id: '1',
          name: 'Content Ideas',
          agentId: agent.id,
        },
        {
          id: '2',
          name: 'Completed Tasks',
          agentId: agent.id,
        },
        {
          id: '3',
          name: 'In Progress',
          agentId: agent.id,
        },
      ];
      
      setFolders(mockFolders);
    } catch (error) {
      console.error('Error fetching folders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderSelect = async (folder: Folder) => {
    setSelectedFolder(folder);
    setView('entries');
    setIsLoading(true);
    
    try {
      const mockEntries: FolderEntry[] = [
        {
          id: '1',
          folderId: folder.id,
          title: 'Create product descriptions for new items',
          content: 'Write compelling product descriptions for the 5 new items added to the store.',
          createdAt: '2025-05-16T10:30:00Z',
          status: 'completed',
        },
        {
          id: '2',
          folderId: folder.id,
          title: 'Design social media campaign for summer sale',
          content: 'Create a comprehensive social media campaign for the upcoming summer sale.',
          createdAt: '2025-05-16T09:15:00Z',
          status: 'in_progress',
        },
        {
          id: '3',
          folderId: folder.id,
          title: 'Analyze customer feedback from last month',
          content: 'Review and analyze customer feedback from the previous month to identify trends and areas for improvement.',
          createdAt: '2025-05-15T14:45:00Z',
          status: 'pending',
        },
      ];
      
      setFolderEntries(mockEntries);
    } catch (error) {
      console.error('Error fetching folder entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToAgents = () => {
    setView('agents');
    setSelectedAgent(null);
    setSelectedFolder(null);
  };

  const handleBackToFolders = () => {
    setView('folders');
    setSelectedFolder(null);
  };

  const handleAddFolder = async () => {
    if (!newFolderName.trim() || !selectedAgent) {
      return;
    }
    
    try {
      const newFolder: Folder = {
        id: `new-${Date.now()}`,
        name: newFolderName,
        agentId: selectedAgent.id,
      };
      
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setIsAddingFolder(false);
    } catch (error) {
      console.error('Error adding folder:', error);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    try {
      setFolders(folders.filter(folder => folder.id !== folderId));
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleAddColumn = () => {
    if (!newColumnName.trim()) {
      return;
    }
    
    setColumns([...columns, newColumnName]);
    setNewColumnName('');
    setIsAddingColumn(false);
  };

  const handleDeleteColumn = (columnIndex: number) => {
    const newColumns = [...columns];
    newColumns.splice(columnIndex, 1);
    setColumns(newColumns);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Navigation */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <button 
            onClick={handleBackToAgents} 
            className="hover:text-primary-600"
          >
            Sintra Agents
          </button>
          
          {selectedAgent && (
            <>
              <span>/</span>
              <button 
                onClick={handleBackToFolders}
                className={`hover:text-primary-600 ${view === 'entries' ? '' : 'font-semibold text-gray-900'}`}
              >
                {selectedAgent.name}
              </button>
            </>
          )}
          
          {selectedFolder && (
            <>
              <span>/</span>
              <span className="font-semibold text-gray-900">{selectedFolder.name}</span>
            </>
          )}
        </div>
      </div>
      
      {/* Agents View */}
      {view === 'agents' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleAgentSelect(agent)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-3 flex items-center justify-center text-2xl font-bold text-primary-600">
                  {agent.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{agent.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Folders View */}
      {view === 'folders' && selectedAgent && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{selectedAgent.name}'s Folders</h2>
            <button 
              onClick={() => setIsAddingFolder(true)}
              className="krake-button-primary"
            >
              Add Folder
            </button>
          </div>
          
          {isAddingFolder && (
            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">New Folder</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name"
                  className="krake-input"
                />
                <button 
                  onClick={handleAddFolder}
                  className="krake-button-primary"
                  disabled={!newFolderName.trim()}
                >
                  Create
                </button>
                <button 
                  onClick={() => setIsAddingFolder(false)}
                  className="krake-button-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div 
                key={folder.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => handleFolderSelect(folder)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{folder.name}</h3>
                  </div>
                  <button 
                    onClick={() => handleDeleteFolder(folder.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                    title="Delete folder"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Entries View (Table) */}
      {view === 'entries' && selectedFolder && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{selectedFolder.name}</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsAddingColumn(true)}
                className="krake-button-outline"
              >
                Add Column
              </button>
            </div>
          </div>
          
          {isAddingColumn && (
            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">New Column</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="Column name"
                  className="krake-input"
                />
                <button 
                  onClick={handleAddColumn}
                  className="krake-button-primary"
                  disabled={!newColumnName.trim()}
                >
                  Add
                </button>
                <button 
                  onClick={() => setIsAddingColumn(false)}
                  className="krake-button-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th 
                      key={index}
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column}</span>
                        {index > 2 && (
                          <button 
                            onClick={() => handleDeleteColumn(index)}
                            className="text-gray-400 hover:text-red-500"
                            title="Delete column"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {folderEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{entry.title}</div>
                      <div className="text-sm text-gray-500">{entry.content.substring(0, 50)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        entry.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                        entry.status === 'failed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {entry.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(entry.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-2">View</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                    {columns.slice(4).map((_, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        -
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SintraAgents;
