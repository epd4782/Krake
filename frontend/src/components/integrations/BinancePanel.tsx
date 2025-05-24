import React, { useState, useEffect } from 'react';

interface BinancePanelProps {
  isExpanded?: boolean;
}

const BinancePanel: React.FC<BinancePanelProps> = ({ isExpanded = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [binanceUrl, setBinanceUrl] = useState('');
  const [accountData, setAccountData] = useState({
    balance: {
      total: 0,
      available: 0,
      locked: 0,
    },
    assets: [
      { symbol: 'BTC', amount: 0, value: 0 },
      { symbol: 'ETH', amount: 0, value: 0 },
      { symbol: 'USDT', amount: 0, value: 0 },
    ],
    trades: {
      today: 0,
      week: 0,
      month: 0,
    },
  });

  useEffect(() => {
    const fetchBinanceData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsAuthenticated(true);
        setBinanceUrl('https://www.binance.com/en/my/dashboard');
        setAccountData({
          balance: {
            total: 15250.75,
            available: 12500.50,
            locked: 2750.25,
          },
          assets: [
            { symbol: 'BTC', amount: 0.25, value: 8750.25 },
            { symbol: 'ETH', amount: 2.5, value: 4250.50 },
            { symbol: 'USDT', amount: 2250, value: 2250 },
          ],
          trades: {
            today: 5,
            week: 28,
            month: 112,
          },
        });
      } catch (error) {
        console.error('Error fetching Binance data:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBinanceData();
  }, []);

  const handleConnect = () => {
    window.open('https://www.binance.com/en/my/settings/api-management', '_blank');
  };

  const handleDisconnect = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading Binance integration...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Connect to Binance</h2>
        <p className="text-gray-600 mb-4">Connect your Binance account to manage your cryptocurrency assets and trades.</p>
        <button 
          onClick={handleConnect}
          className="krake-button-primary"
        >
          Connect Binance Account
        </button>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Binance Integration</h2>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-xl font-semibold text-gray-900">${accountData.balance.total.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">BTC Balance</p>
            <p className="text-xl font-semibold text-gray-900">{accountData.assets[0].amount}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Trades Today</p>
            <p className="text-xl font-semibold text-gray-900">{accountData.trades.today}</p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href={binanceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            Open Binance Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Binance Integration</h2>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
          <button 
            onClick={handleDisconnect}
            className="krake-button-outline text-sm"
          >
            Disconnect
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="krake-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Total Balance</h4>
            <p className="text-2xl font-semibold text-gray-900 mb-2">${accountData.balance.total.toFixed(2)}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Available: ${accountData.balance.available.toFixed(2)}</span>
              <span className="text-gray-500">Locked: ${accountData.balance.locked.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="krake-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Trades</h4>
            <p className="text-2xl font-semibold text-gray-900 mb-2">{accountData.trades.month}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Today: {accountData.trades.today}</span>
              <span className="text-gray-500">Week: {accountData.trades.week}</span>
            </div>
          </div>
          
          <div className="krake-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Market Status</h4>
            <p className="text-2xl font-semibold text-gray-900 mb-2">Active</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">API Status: Online</span>
              <span className="text-gray-500">Latency: 45ms</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Asset Portfolio</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value (USD)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24h Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accountData.assets.map((asset, index) => (
                <tr key={asset.symbol}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                        {asset.symbol.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${asset.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((asset.value / accountData.balance.total) * 100).toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={index % 2 === 0 ? "text-green-600" : "text-red-600"}>
                      {index % 2 === 0 ? "+" : "-"}{(Math.random() * 5).toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Trades</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pair
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BTC/USDT</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Buy
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$35,245.75</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.05 BTC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ETH/USDT</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Sell
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,850.25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.2 ETH</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 hours ago</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BTC/USDT</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Sell
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$34,980.50</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.08 BTC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center">
        <a 
          href={binanceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="krake-button-primary inline-block"
        >
          Open Binance Dashboard
        </a>
      </div>
    </div>
  );
};

export default BinancePanel;
