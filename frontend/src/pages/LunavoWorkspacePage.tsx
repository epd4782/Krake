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

const LunavoWorkspacePage: React.FC = () => {
  const [kpis, setKpis] = useState<WorkspaceKPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const mockKPIs: WorkspaceKPI[] = [
          {
            id: '1',
            name: 'Revenue Today',
            value: 1250.75,
            unit: 'USD',
          },
          {
            id: '2',
            name: 'Visitors',
            value: 1876,
            unit: 'count',
          },
          {
            id: '3',
            name: 'Conversion Rate',
            value: 3.2,
            unit: '%',
          },
          {
            id: '4',
            name: 'Email Signups',
            value: 42,
            unit: 'count',
          },
          {
            id: '5',
            name: 'Content Score',
            value: 87,
            unit: 'points',
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="krake-card">
            <h3 className="text-sm font-medium text-gray-500">{kpi.name}</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {kpi.value}{kpi.unit === 'USD' ? '$' : ''}{kpi.unit === '%' ? '%' : ''}
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
        
        {/* Shopify Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Shopify Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your Shopify store and orders</p>
          <button className="krake-button-primary">Open Shopify</button>
        </div>
        
        {/* Gelato Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Gelato Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your Gelato print-on-demand products</p>
          <button className="krake-button-primary">Open Gelato</button>
        </div>
        
        {/* Email Builder & Manager Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Builder & Manager</h3>
          <p className="text-sm text-gray-600 mb-4">Manage email campaigns, building, and inbox</p>
          <EmailBuilderManager workspace="lunavo" />
        </div>
        
        {/* Cross Platform Auto-Posting Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cross Platform Auto-Posting</h3>
          <p className="text-sm text-gray-600 mb-4">Schedule, generate, and publish content across platforms</p>
          <CrossPlatformAutoPosting workspace="lunavo" />
        </div>
        
        {/* Gamma Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Gamma</h3>
          <p className="text-sm text-gray-600 mb-4">Create presentations and visual content</p>
          <div className="px-4 py-2 bg-gray-100 rounded-md text-sm text-gray-500">
            Placeholder - Coming Soon (Optional)
          </div>
        </div>
        
        {/* Social Media Content Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media Content</h3>
          <p className="text-sm text-gray-600 mb-4">Manage social media content and campaigns</p>
          <CrossPlatformAutoPosting workspace="lunavo" />
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
        
        {/* Coordinator Overview Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coordinator Overview</h3>
          <p className="text-sm text-gray-600 mb-4">Schedule and manage Sintra agent tasks</p>
          <button className="krake-button-primary">Open Coordinator</button>
        </div>
        
        {/* Media Tools Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Media Tools</h3>
          <p className="text-sm text-gray-600 mb-4">Create and edit reels and videos</p>
          <CrossPlatformAutoPosting workspace="lunavo" />
        </div>
      </div>
      
      {/* Activity Overview */}
      <div className="krake-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">New order #1234 received</span>
            <span className="text-xs text-gray-500">10 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Product descriptions updated by Buddy</span>
            <span className="text-xs text-gray-500">25 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Marketing campaign created by Milli</span>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">New product added to Shopify store</span>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LunavoWorkspacePage;
