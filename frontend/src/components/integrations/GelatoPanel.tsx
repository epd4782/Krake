import React, { useState, useEffect } from 'react';

interface GelatoPanelProps {
  isExpanded?: boolean;
}

const GelatoPanel: React.FC<GelatoPanelProps> = ({ isExpanded = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gelatoUrl, setGelatoUrl] = useState('');
  const [storeData, setStoreData] = useState({
    products: {
      total: 0,
      active: 0,
      draft: 0,
    },
    orders: {
      total: 0,
      pending: 0,
      shipped: 0,
    },
    revenue: {
      today: 0,
      week: 0,
      month: 0,
    },
  });

  useEffect(() => {
    const fetchGelatoData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsAuthenticated(true);
        setGelatoUrl('https://dashboard.gelato.com');
        setStoreData({
          products: {
            total: 45,
            active: 38,
            draft: 7,
          },
          orders: {
            total: 87,
            pending: 5,
            shipped: 82,
          },
          revenue: {
            today: 450.25,
            week: 3250.75,
            month: 12750.50,
          },
        });
      } catch (error) {
        console.error('Error fetching Gelato data:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGelatoData();
  }, []);

  const handleConnect = () => {
    window.open('https://dashboard.gelato.com/oauth', '_blank');
  };

  const handleDisconnect = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading Gelato integration...</p>
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">Connect to Gelato</h2>
        <p className="text-gray-600 mb-4">Connect your Gelato account to manage print-on-demand products and orders.</p>
        <button 
          onClick={handleConnect}
          className="krake-button-primary"
        >
          Connect Gelato Account
        </button>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Gelato Integration</h2>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Active Products</p>
            <p className="text-xl font-semibold text-gray-900">{storeData.products.active}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-xl font-semibold text-gray-900">{storeData.orders.pending}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Revenue (Month)</p>
            <p className="text-xl font-semibold text-gray-900">${storeData.revenue.month.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href={gelatoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            Open Gelato Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Gelato Integration</h2>
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
            <h4 className="text-sm font-medium text-gray-500 mb-1">Products</h4>
            <p className="text-2xl font-semibold text-gray-900 mb-2">{storeData.products.total}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active: {storeData.products.active}</span>
              <span className="text-gray-500">Draft: {storeData.products.draft}</span>
            </div>
          </div>
          
          <div className="krake-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Orders</h4>
            <p className="text-2xl font-semibold text-gray-900 mb-2">{storeData.orders.total}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pending: {storeData.orders.pending}</span>
              <span className="text-gray-500">Shipped: {storeData.orders.shipped}</span>
            </div>
          </div>
          
          <div className="krake-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Revenue</h4>
            <p className="text-2xl font-semibold text-gray-900 mb-2">${storeData.revenue.month.toFixed(2)}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Today: ${storeData.revenue.today.toFixed(2)}</span>
              <span className="text-gray-500">Week: ${storeData.revenue.week.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">G-12345</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 16, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$45.99</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    In Production
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">G-12344</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$29.99</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Shipped
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">G-12343</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 14, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$75.50</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Delivered
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Popular Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Custom T-Shirt</h4>
              <p className="text-sm text-gray-500 mt-1">$24.99</p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-500">Sales: 125</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Wall Art Print</h4>
              <p className="text-sm text-gray-500 mt-1">$39.99</p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-500">Sales: 87</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Custom Mug</h4>
              <p className="text-sm text-gray-500 mt-1">$19.99</p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-500">Sales: 65</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <a 
          href={gelatoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="krake-button-primary inline-block"
        >
          Open Gelato Dashboard
        </a>
      </div>
    </div>
  );
};

export default GelatoPanel;
