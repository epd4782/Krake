import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../contexts/WorkspaceContext';
import EmailBuilderManager from '../components/integrations/EmailBuilderManager';
import CrossPlatformAutoPosting from '../components/integrations/CrossPlatformAutoPosting';
import AffiliateBotManager from '../components/integrations/AffiliateBotManager';
import ProfitPilotManager from '../components/integrations/ProfitPilotManager';

interface WorkspaceKPI {
  id: string;
  name: string;
  value: number;
  unit: string;
}

const LunabotsWorkspacePage: React.FC = () => {
  const [kpis, setKpis] = useState<WorkspaceKPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const mockKPIs: WorkspaceKPI[] = [
          {
            id: '1',
            name: 'Finance Bot: DRP',
            value: 12.5,
            unit: '%',
          },
          {
            id: '2',
            name: 'Finance Bot: Win Rate',
            value: 68.3,
            unit: '%',
          },
          {
            id: '3',
            name: 'Finance Bot: Max Drawdown',
            value: 8.7,
            unit: '%',
          },
          {
            id: '4',
            name: 'Finance Bot: TPD',
            value: 42,
            unit: 'USD',
          },
          {
            id: '5',
            name: 'Finance Bot: Uptime',
            value: 99.8,
            unit: '%',
          },
          {
            id: '6',
            name: 'Affiliate Bot: Daily Revenue',
            value: 325.50,
            unit: 'USD',
          },
          {
            id: '7',
            name: 'Affiliate Bot: CTR',
            value: 2.8,
            unit: '%',
          },
          {
            id: '8',
            name: 'Affiliate Bot: TPP',
            value: 1.25,
            unit: 'USD',
          },
          {
            id: '9',
            name: 'Affiliate Bot: New Programs',
            value: 3,
            unit: 'count',
          },
          {
            id: '10',
            name: 'Affiliate Bot: Active Links',
            value: 87,
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="krake-card">
            <h3 className="text-sm font-medium text-gray-500">{kpi.name}</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {kpi.unit === 'USD' ? '$' : ''}{kpi.value}{kpi.unit === '%' ? '%' : ''}
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
        
        {/* ProfitPilot Trading Bot Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">ProfitPilot Trading Bot</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your automated trading strategies</p>
          <ProfitPilotManager workspace="lunabots" />
        </div>
        
        {/* Binance Integration Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Binance Integration</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your Binance account and trades</p>
          <button className="krake-button-primary">Open Binance</button>
        </div>
        
        {/* Affiliate Bot Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Affiliate Bot</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your affiliate marketing campaigns</p>
          <AffiliateBotManager workspace="lunabots" />
        </div>
        
        {/* Email Builder & Manager Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Builder & Manager</h3>
          <p className="text-sm text-gray-600 mb-4">Manage email campaigns, building, and inbox</p>
          <EmailBuilderManager workspace="lunabots" />
        </div>
        
        {/* Cross Platform Auto-Posting Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cross Platform Auto-Posting</h3>
          <p className="text-sm text-gray-600 mb-4">Schedule, generate, and publish content across platforms</p>
          <CrossPlatformAutoPosting workspace="lunabots" />
        </div>
        
        {/* Social Media Content Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media Content</h3>
          <p className="text-sm text-gray-600 mb-4">Manage social media content and campaigns</p>
          <CrossPlatformAutoPosting workspace="lunabots" />
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
          <CrossPlatformAutoPosting workspace="lunabots" />
        </div>
      </div>
      
      {/* Activity Overview */}
      <div className="krake-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Finance Bot: 3 new trades executed</span>
            <span className="text-xs text-gray-500">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Affiliate Bot: 12 new clicks</span>
            <span className="text-xs text-gray-500">45 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Binance API connection refreshed</span>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">New affiliate program joined</span>
            <span className="text-xs text-gray-500">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LunabotsWorkspacePage;
