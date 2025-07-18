'use client';

import { Clock } from 'lucide-react';
import { formatDate } from '@/lib/dateUtils';
import { useState, useEffect } from 'react';
import { useDatePicker } from './DatePickerContext'; 

const UpcomingDatesList = () => {
  const { selectedDates } = useDatePicker();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="mr-2 text-gray-600" />
        Upcoming Dates ({selectedDates.length})
      </h3>
      
      <div className="max-h-64 overflow-y-auto space-y-2">
        {selectedDates.length > 0 ? (
          <>
            {selectedDates.slice(0, 20).map((date, index) => {
                const isUpcoming = date >= new Date().setHours(0, 0, 0, 0);

                return (
                    <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-white rounded border"
                    >
                        <span className="text-sm">{formatDate(date)}</span>
                        {isClient && (
                             <span className={`text-xs px-2 py-1 rounded-full ${isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {isUpcoming ? 'Upcoming' : 'Past'}
                            </span>
                        )}
                    </div>
                )
            })}
            {selectedDates.length > 20 && (
              <div className="text-center text-sm text-gray-500 py-2">
                ... and {selectedDates.length - 20} more dates
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-8">
            No dates generated. Please check your configuration.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingDatesList;