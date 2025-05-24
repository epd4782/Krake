import React, { useState, useEffect } from 'react';

interface ShopifyPanelProps {
  isExpanded?: boolean;
}

const ShopifyPanel: React.FC<ShopifyPanelProps> = ({ isExpanded = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shopifyUrl, setShopifyUrl] = useState('');
  const [storeData, setStoreData] = useState({
    orders: {
      total: 0,
      pending: 0,
      fulfilled: 0,
    },
    products: {
      total: 0,
      active: 0,
      draft: 0,
    },
    revenue: {
      today: 0,
      week: 0,
      month: 0,
    },
  });

  useEffect(() => {
    const fetchShopifyData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsAuthenticated(true);
        setShopifyUrl('https://lunavo-store.myshopify.com');
        setStoreData({
          orders: {
            total: 156,
            pending: 12,
            fulfilled: 144,
          },
          products: {
            total: 87,
            active: 75,
            draft: 12,
          },
          revenue: {
            today: 1250.75,
            week: 8750.25,
            month: 32500.50,
          },
        });
      } catch (error) {
        console.error('Error fetching Shopify data:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopifyData();
  }, []);

  const handleConnect = () => {
    window.open('https://shopify.com/oauth', '_blank');
  };

  const handleDisconnect = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading Shopify integration...</p>
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">Connect to Shopify</h2>
        <p className="text-gray-600 mb-4">Connect your Shopify store to manage products, orders, and customers.</p>
        <button 
          onClick={handleConnect}
          className="krake-button-primary"
        >
          Connect Shopify Store
        </button>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Shopify Integration</h2>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Orders Today</p>
            <p className="text-xl font-semibold text-gray-900">{storeData.orders.pending}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Revenue Today</p>
            <p className="text-xl font-semibold text-gray-900">${storeData.revenue.today.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Active Products</p>
            <p className="text-xl font-semibold text-gray-900">{storeData.products.active}</p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href={shopifyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            Open Shopify Admin
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Shopify Integration</h2>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Store Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="krake-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Orders</h4>
            <p className="text-2xl font-semibold text-gray-900 mb-2">{storeData.orders.total}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pending: {storeData.orders.pending}</span>
              <span className="text-gray-500">Fulfilled: {storeData.orders.fulfilled}</span>
            </div>
          </div>
          
          <div className="krake-card">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Products</h4>
            <p className="text-2xl font-semibold text-gray-900 mb-2">{storeData.products.total}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active: {storeData.products.active}</span>
              <span className="text-gray-500">Draft: {storeData.products.draft}</span>
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
                  Order #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#1001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 16, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$125.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Fulfilled
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#1002</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 16, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$85.50</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Processing
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#1003</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Robert Johnson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$210.25</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Fulfilled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center">
        <a 
          href={shopifyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="krake-button-primary inline-block"
        >
          Open Shopify Admin
        </a>
      </div>
    </div>
  );
};

export default ShopifyPanel;
