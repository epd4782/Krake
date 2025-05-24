import React, { useState, useEffect } from 'react';

interface Error {
  id: string;
  source: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'resolving' | 'escalated' | 'resolved';
  workspace?: string;
  integration?: string;
  details?: string;
  resolution?: string;
}

interface ErrorHandlerProps {
  onEscalate?: (error: Error) => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ onEscalate }) => {
  const [errors, setErrors] = useState<Error[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeError, setActiveError] = useState<Error | null>(null);
  const [isResolvingError, setIsResolvingError] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');

  useEffect(() => {
    const fetchErrors = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockErrors: Error[] = [
          {
            id: '1',
            source: 'Shopify Integration',
            message: 'Failed to sync product inventory',
            timestamp: '2025-05-16T15:30:00Z',
            severity: 'medium',
            status: 'detected',
            workspace: 'Lunavo',
            integration: 'Shopify',
            details: 'API rate limit exceeded when attempting to sync product inventory.',
          },
          {
            id: '2',
            source: 'Gelato Integration',
            message: 'Order fulfillment failed',
            timestamp: '2025-05-16T14:45:00Z',
            severity: 'high',
            status: 'resolving',
            workspace: 'Lunavo',
            integration: 'Gelato',
            details: 'Order #G-12345 failed to process due to invalid shipping address.',
          },
          {
            id: '3',
            source: 'Binance Integration',
            message: 'API authentication failed',
            timestamp: '2025-05-16T12:15:00Z',
            severity: 'critical',
            status: 'escalated',
            workspace: 'Lunabots',
            integration: 'Binance',
            details: 'API key has expired or been revoked.',
          },
          {
            id: '4',
            source: 'Task Scheduler',
            message: 'Scheduled task failed to execute',
            timestamp: '2025-05-16T10:30:00Z',
            severity: 'low',
            status: 'resolved',
            workspace: 'Monarch',
            details: 'Task "Generate weekly content" failed due to timeout.',
            resolution: 'Increased timeout limit and rescheduled the task.',
          },
        ];
        
        setErrors(mockErrors);
      } catch (error) {
        console.error('Error fetching errors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchErrors();
  }, []);

  const handleViewError = (error: Error) => {
    setActiveError(error);
  };

  const handleCloseError = () => {
    setActiveError(null);
    setIsResolvingError(false);
    setResolutionNote('');
  };

  const handleResolveError = async () => {
    if (!activeError) return;
    
    setIsResolvingError(true);
  };

  const handleConfirmResolution = async () => {
    if (!activeError || !resolutionNote.trim()) return;
    
    try {
      const updatedErrors = errors.map(error => {
        if (error.id === activeError.id) {
          return {
            ...error,
            status: 'resolved' as const,
            resolution: resolutionNote,
          };
        }
        return error;
      });
      
      setErrors(updatedErrors);
      setActiveError(null);
      setIsResolvingError(false);
      setResolutionNote('');
    } catch (error) {
      console.error('Error resolving error:', error);
    }
  };

  const handleEscalateError = async () => {
    if (!activeError) return;
    
    try {
      const updatedErrors = errors.map(error => {
        if (error.id === activeError.id) {
          return {
            ...error,
            status: 'escalated' as const,
          };
        }
        return error;
      });
      
      setErrors(updatedErrors);
      
      if (onEscalate) {
        onEscalate(activeError);
      }
      
      setActiveError(null);
    } catch (error) {
      console.error('Error escalating error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getSeverityColor = (severity: Error['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Error['status']) => {
    switch (status) {
      case 'detected':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolving':
        return 'bg-blue-100 text-blue-800';
      case 'escalated':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading error data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">System Error Handler</h2>
      
      {errors.length === 0 ? (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600">No system errors detected</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {errors.map((error) => (
                <tr key={error.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {error.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {error.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(error.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(error.severity)}`}>
                      {error.severity.charAt(0).toUpperCase() + error.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(error.status)}`}>
                      {error.status.charAt(0).toUpperCase() + error.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewError(error)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Error Details Modal */}
      {activeError && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Error Details</h3>
              <button 
                onClick={handleCloseError}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Source</p>
                <p className="text-base text-gray-900">{activeError.source}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Message</p>
                <p className="text-base text-gray-900">{activeError.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Timestamp</p>
                  <p className="text-base text-gray-900">{formatDate(activeError.timestamp)}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Workspace</p>
                  <p className="text-base text-gray-900">{activeError.workspace || 'N/A'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Severity</p>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(activeError.severity)}`}>
                    {activeError.severity.charAt(0).toUpperCase() + activeError.severity.slice(1)}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(activeError.status)}`}>
                    {activeError.status.charAt(0).toUpperCase() + activeError.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {activeError.integration && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Integration</p>
                  <p className="text-base text-gray-900">{activeError.integration}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-500">Details</p>
                <p className="text-base text-gray-900">{activeError.details || 'No details available'}</p>
              </div>
              
              {activeError.resolution && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Resolution</p>
                  <p className="text-base text-gray-900">{activeError.resolution}</p>
                </div>
              )}
              
              {isResolvingError ? (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Resolution Note</p>
                  <textarea
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="Enter resolution details..."
                    rows={3}
                    className="krake-input"
                  />
                </div>
              ) : null}
              
              <div className="flex justify-end space-x-2 pt-2">
                {activeError.status !== 'resolved' && !isResolvingError && (
                  <>
                    <button 
                      onClick={handleResolveError}
                      className="krake-button-primary"
                    >
                      Resolve
                    </button>
                    
                    {activeError.status !== 'escalated' && (
                      <button 
                        onClick={handleEscalateError}
                        className="krake-button-outline"
                      >
                        Escalate to User
                      </button>
                    )}
                  </>
                )}
                
                {isResolvingError && (
                  <>
                    <button 
                      onClick={handleConfirmResolution}
                      className="krake-button-primary"
                      disabled={!resolutionNote.trim()}
                    >
                      Confirm Resolution
                    </button>
                    
                    <button 
                      onClick={() => setIsResolvingError(false)}
                      className="krake-button-outline"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorHandler;
