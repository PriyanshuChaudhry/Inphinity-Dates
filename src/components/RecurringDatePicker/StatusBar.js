const StatusBar = ({ isConfigured, dateCount }) => {
  return (
    <div className="mt-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 transition-colors ${isConfigured ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-700">
            {isConfigured ? 'Configuration Applied' : 'Configure your recurring dates'}
          </span>
        </div>
        
        {isConfigured && (
          <div className="text-sm text-gray-600">
            {dateCount} dates generated
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBar;