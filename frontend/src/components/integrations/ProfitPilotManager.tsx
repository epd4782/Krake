import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';

interface ProfitPilotManagerProps {
  isExpanded?: boolean;
  workspace?: string;
}

const ProfitPilotManager: React.FC<ProfitPilotManagerProps> = ({ 
  isExpanded = false,
  workspace = 'lunabots'
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [strategies, setStrategies] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);
  const [trades, setTrades] = useState([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [activeStrategy, setActiveStrategy] = useState<any>(null);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockStrategies = [
          {
            id: '1',
            name: 'Smart Grid Strategy',
            description: 'Automated grid trading strategy with dynamic grid spacing',
            type: 'Smart Grid',
            isActive: true,
            config: {
              gridLevels: 10,
              gridSpacing: 1.5,
              takeProfit: 3.0,
              stopLoss: 5.0,
              maxTrades: 5,
              timeframes: ['1h', '4h'],
            },
          },
          {
            id: '2',
            name: 'DCA Strategy',
            description: 'Dollar-cost averaging strategy for long-term positions',
            type: 'DCA',
            isActive: false,
            config: {
              initialBuy: 100,
              dcaAmount: 50,
              dcaInterval: 24,
              takeProfit: 10.0,
              maxBuys: 10,
              timeframes: ['1d'],
            },
          },
          {
            id: '3',
            name: 'Trend Following',
            description: 'Strategy that follows market trends using EMA and RSI',
            type: 'Trend',
            isActive: false,
            config: {
              emaShort: 9,
              emaLong: 21,
              rsiPeriod: 14,
              rsiOverbought: 70,
              rsiOversold: 30,
              takeProfit: 5.0,
              stopLoss: 3.0,
              timeframes: ['15m', '1h'],
            },
          },
        ];
        
        setStrategies(mockStrategies);
        setActiveStrategy(mockStrategies[0]);
        
        setApiKeys([
          {
            id: '1',
            platform: 'Binance',
            name: 'Main Trading Account',
            isActive: true,
            lastUsed: '2 hours ago',
          },
          {
            id: '2',
            platform: 'Binance',
            name: 'Test Account',
            isActive: false,
            lastUsed: '3 days ago',
          },
        ]);
        
        setTrades([
          {
            id: '1',
            strategy: 'Smart Grid Strategy',
            symbol: 'BTC/USDT',
            side: 'buy',
            quantity: 0.05,
            price: 30000.00,
            status: 'closed',
            profitLoss: 75.00,
            closePrice: 31500.00,
            closeTime: '2025-05-14 15:30:00',
            openTime: '2025-05-13 10:00:00',
          },
          {
            id: '2',
            strategy: 'Smart Grid Strategy',
            symbol: 'ETH/USDT',
            side: 'buy',
            quantity: 0.5,
            price: 2000.00,
            status: 'open',
            profitLoss: null,
            closePrice: null,
            closeTime: null,
            openTime: '2025-05-15 09:30:00',
          },
          {
            id: '3',
            strategy: 'Trend Following',
            symbol: 'SOL/USDT',
            side: 'sell',
            quantity: 10.0,
            price: 100.00,
            status: 'closed',
            profitLoss: -50.00,
            closePrice: 95.00,
            closeTime: '2025-05-15 12:00:00',
            openTime: '2025-05-14 14:00:00',
          },
        ]);
        
        setStatistics({
          drp: 12.5,
          winRate: 68.3,
          maxDrawdown: 8.7,
          tpd: 42,
          uptime: 99.8,
          totalTrades: 42,
          winningTrades: 28,
          losingTrades: 14,
          profitLoss: 325.50,
          avgTradeDuration: 5.2,
        });
        
      } catch (error) {
        console.error('Error loading ProfitPilot data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [workspace]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading ProfitPilot Trading Bot...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">ProfitPilot Trading Bot</h2>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Disconnected</span>
        </div>
        <p className="text-gray-600 mb-4">Connect to access automated trading strategies and portfolio management.</p>
        <button 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => setIsAuthenticated(true)}
        >
          Connect ProfitPilot
        </button>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">ProfitPilot Trading Bot</h2>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
        </div>
        <p className="text-gray-600 mb-4">Automated trading strategies and portfolio management</p>
        <div className="flex space-x-2">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{statistics?.drp}%</span> DRP
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{statistics?.winRate}%</span> Win Rate
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">${statistics?.tpd}</span> TPD
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">ProfitPilot Trading Bot</h2>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
          <button 
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsAuthenticated(false)}
          >
            Disconnect
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 ${activeTab === 'dashboard' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'strategies' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('strategies')}
          >
            Strategies
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'trades' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('trades')}
          >
            Trades
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'api-keys' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('api-keys')}
          >
            API Keys
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
      </div>
      
      {/* Tab content would go here - omitted for brevity */}
      <div className="text-center py-8 text-gray-500">
        {activeTab === 'dashboard' && "Dashboard content - KPIs, active strategy, recent trades"}
        {activeTab === 'strategies' && "Strategies content - list of trading strategies"}
        {activeTab === 'trades' && "Trades content - trade history and performance"}
        {activeTab === 'api-keys' && "API Keys content - manage exchange API keys"}
        {activeTab === 'settings' && "Settings content - risk parameters, technical indicators"}
      </div>
    </div>
  );
};

export default ProfitPilotManager;
