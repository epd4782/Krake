import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../contexts/WorkspaceContext';
import EmailBuilderManager from '../components/integrations/EmailBuilderManager';
import CrossPlatformAutoPosting from '../components/integrations/CrossPlatformAutoPosting';

interface WorkspaceKPI {
  id: string;
  name: string;
  value: number;
  unit: string;
}

const HardLifeModeWorkspacePage: React.FC = () => {
  const [kpis, setKpis] = useState<WorkspaceKPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const mockKPIs: WorkspaceKPI[] = [
          {
            id: '1',
            name: 'Reach per Post',
            value: 12500,
            unit: 'count',
          },
          {
            id: '2',
            name: 'Save Rate',
            value: 8.7,
            unit: '%',
          },
          {
            id: '3',
            name: 'FGR',
            value: 3.2,
            unit: '%',
          },
          {
            id: '4',
            name: 'EPM',
            value: 42,
            unit: 'count',
          },
        ];
        
        setKpis(mockKPIs);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading workspace data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="krake-card">
            <h3 className="text-sm font-medium text-gray-500">{kpi.name}</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {kpi.value}{kpi.unit === '%' ? '%' : ''}
            </p>
          </div>
        ))}
      </div>
      
      {/* Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sintra Agents Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sintra Agents</h3>
          <p className="text-sm text-gray-600 mb-4">Access and manage all 12 Sintra AI agents</p>
          <button className="krake-button-primary">Open Agents</button>
        </div>
        
        {/* Social Media Content Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media Content</h3>
          <p className="text-sm text-gray-600 mb-4">Manage social media content and campaigns</p>
          <CrossPlatformAutoPosting workspace="hardlifemode" />
        </div>
        
        {/* Projects Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Projects</h3>
          <p className="text-sm text-gray-600 mb-4">Manage and track ongoing projects</p>
          <button className="krake-button-primary">Open Folder</button>
        </div>
        
        {/* AI Communication Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Communication</h3>
          <p className="text-sm text-gray-600 mb-4">Store and use AI task results</p>
          <button className="krake-button-primary">Open Folder</button>
        </div>
        
        {/* Email Builder & Manager Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Builder & Manager</h3>
          <p className="text-sm text-gray-600 mb-4">Manage email campaigns, building, and inbox</p>
          <EmailBuilderManager workspace="hardlifemode" />
        </div>
        
        {/* Coordinator Overview Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coordinator Overview</h3>
          <p className="text-sm text-gray-600 mb-4">Schedule and manage Sintra agent tasks</p>
          <button className="krake-button-primary">Open Coordinator</button>
        </div>
        
        {/* Social Media High-End Creation Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media High-End Creation</h3>
          <p className="text-sm text-gray-600 mb-4">Create high-quality social media content</p>
          <CrossPlatformAutoPosting workspace="hardlifemode" />
        </div>
        
        {/* Cross Platform Auto-Posting Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cross Platform Auto-Posting</h3>
          <p className="text-sm text-gray-600 mb-4">Schedule, generate, and publish content across platforms</p>
          <CrossPlatformAutoPosting workspace="hardlifemode" />
        </div>
      </div>
      
      {/* Activity Overview */}
      <div className="krake-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">New post created by Vizzy</span>
            <span className="text-xs text-gray-500">20 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Content engagement up 12% this week</span>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">New content strategy created by Commet</span>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Weekly analytics report generated</span>
            <span className="text-xs text-gray-500">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardLifeModeWorkspacePage;
