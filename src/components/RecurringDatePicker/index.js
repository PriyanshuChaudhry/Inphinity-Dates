'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import ConfigurationPanel from './ConfigurationPanel';
import PreviewPanel from './PreviewPanel';
import StatusBar from './StatusBar'; 
import { generateRecurringDates } from '@/lib/dateUtils';
import { DatePickerProvider, useDatePicker } from './DatePickerContext';

const DatePickerLayout = () => {
  const {
    isConfigured,
    selectedDates,
    setSelectedDates,
    startDate,
    endDate,
    recurrenceType,
    customInterval,
    selectedDaysOfWeek,
    monthlyPattern,
    monthlyDay,
    monthlyDayOfWeek
  } = useDatePicker();

  useEffect(() => {
    if (isConfigured) {
      const dates = generateRecurringDates(
        startDate, endDate, recurrenceType, customInterval, 
        selectedDaysOfWeek, monthlyPattern, monthlyDay, monthlyDayOfWeek
      );
      setSelectedDates(dates);
    }
  }, [
    isConfigured,
    startDate, endDate, recurrenceType, customInterval, 
    selectedDaysOfWeek, monthlyPattern, monthlyDay, monthlyDayOfWeek, setSelectedDates
  ]);


  return (
    <div className="w-max-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Image
            src="/inphinity-logo.png"
            alt="Inphinity Dates Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          Inphinity Dates
        </h1>
        <p className="text-gray-600">Configure recurring dates with endless possibilities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfigurationPanel />
        <PreviewPanel />
      </div>

     
      <StatusBar isConfigured={isConfigured} dateCount={selectedDates.length} />
    </div>
  );
};

const RecurringDatePicker = ({ onDatesChange }) => {
  return (
    <DatePickerProvider onDatesChange={onDatesChange}>
      <DatePickerLayout />
    </DatePickerProvider>
  );
};

export default RecurringDatePicker;