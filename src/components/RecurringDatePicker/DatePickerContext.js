'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';

const DatePickerContext = createContext();

export const useDatePicker = () => {
  return useContext(DatePickerContext);
};

export const DatePickerProvider = ({ children, onDatesChange = () => {} }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [recurrenceType, setRecurrenceType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customInterval, setCustomInterval] = useState(1);
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
  const [monthlyPattern, setMonthlyPattern] = useState('date');
  const [monthlyDay, setMonthlyDay] = useState('first');
  const [monthlyDayOfWeek, setMonthlyDayOfWeek] = useState('monday');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isConfigured, setIsConfigured] = useState(false);

  const toggleDayOfWeek = useCallback((day) => {
    setSelectedDaysOfWeek(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);
  
  const applyConfiguration = useCallback(() => {
    if (startDate && recurrenceType) {
      setIsConfigured(true);
    }
  }, [startDate, recurrenceType]);

  const resetConfiguration = useCallback(() => {
    setRecurrenceType('');
    setStartDate('');
    setEndDate('');
    setCustomInterval(1);
    setSelectedDaysOfWeek([]);
    setMonthlyPattern('date');
    setMonthlyDay('first');
    setMonthlyDayOfWeek('monday');
    setSelectedDates([]);
    onDatesChange([]);
    setIsConfigured(false);
  }, [onDatesChange]);

  const handleSetSelectedDates = useCallback((dates) => {
    setSelectedDates(dates);
    onDatesChange(dates);
  }, [onDatesChange]);

  const value = {
    selectedDates, 
    setSelectedDates: handleSetSelectedDates,
    recurrenceType, setRecurrenceType,
    startDate, setStartDate,
    endDate, setEndDate,
    customInterval, setCustomInterval,
    selectedDaysOfWeek, setSelectedDaysOfWeek, toggleDayOfWeek,
    monthlyPattern, setMonthlyPattern,
    monthlyDay, setMonthlyDay,
    monthlyDayOfWeek, setMonthlyDayOfWeek,
    currentMonth, setCurrentMonth, nextMonth, prevMonth,
    resetConfiguration,
    isConfigured, setIsConfigured, applyConfiguration
  };

  return (
    <DatePickerContext.Provider value={value}>
      {children}
    </DatePickerContext.Provider>
  );
};