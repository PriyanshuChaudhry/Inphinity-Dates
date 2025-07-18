// src/components/RecurringDatePicker/RecurringDatePicker.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecurringDatePicker from './index';

// Mock the Image component from Next.js as it's not needed for the test
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next Image Mock';
  },
}));

describe('RecurringDatePicker Integration Test', () => {
  it('should allow a user to fill out the form, apply, and see the generated dates', async () => {
    // A spy function to check if our callback is called with the right data
    const handleDatesChange = jest.fn();

    render(<RecurringDatePicker onDatesChange={handleDatesChange} />);

    // 1. Find elements on the screen
    const startDateInput = screen.getByLabelText(/Start Date/i);
    const recurrenceTypeButton = screen.getByRole('button', { name: /Daily/i });
    const applyButton = screen.getByRole('button', { name: /Apply/i });
    
    // 2. Simulate user actions
    fireEvent.change(startDateInput, { target: { value: '2025-08-10' } });
    fireEvent.click(recurrenceTypeButton);
    fireEvent.click(applyButton);

    // 3. Check for the result
    // We use waitFor because the date generation is an effect that takes time
    await waitFor(() => {
      // Check if the list of upcoming dates appears
      const upcomingDatesHeader = screen.getByText(/Upcoming Dates/i);
      expect(upcomingDatesHeader).toBeInTheDocument();

      // Check for a specific generated date
      const firstDate = screen.getByText(/Sun, Aug 10, 2025/i);
      expect(firstDate).toBeInTheDocument();
    });

    // 4. Check if our onDatesChange callback was called
    expect(handleDatesChange).toHaveBeenCalled();
    // Check if the first argument passed to the callback has at least one date
    expect(handleDatesChange.mock.calls[0][0].length).toBeGreaterThan(0);
    // Check the first date in the callback's argument
    expect(handleDatesChange.mock.calls[0][0][0].getFullYear()).toBe(2025);
  });
});