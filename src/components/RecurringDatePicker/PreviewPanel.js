'use client';

import { Calendar } from 'lucide-react';
import CalendarView from './CalendarView';
import UpcomingDatesList from './UpcomingDatesList';
import { useDatePicker } from './DatePickerContext'; 

const PreviewPanel = () => {
  
  const { 
    currentMonth, 
    prevMonth, 
    nextMonth, 
    selectedDates, 
    isConfigured 
  } = useDatePicker();

  
  if (!currentMonth) {
    return null; 
  }

  return (
    <div className="space-y-6">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="mr-2 text-gray-600" />
          Calendar Preview
        </h3>
        
        <CalendarView
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          selectedDates={selectedDates}
        />
      </div>

      
      {isConfigured && <UpcomingDatesList />}
    </div>
  );
};

export default PreviewPanel;