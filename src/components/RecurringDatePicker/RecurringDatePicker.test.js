import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecurringDatePicker from './index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next Image Mock';
  },
}));

describe('RecurringDatePicker Integration Test', () => {
  it('should allow a user to fill out the form, apply, and see the generated dates', async () => {
    
    const handleDatesChange = jest.fn();

    render(<RecurringDatePicker onDatesChange={handleDatesChange} />);

    const startDateInput = screen.getByLabelText(/Start Date/i);
    const recurrenceTypeButton = screen.getByRole('button', { name: /Daily/i });
    const applyButton = screen.getByRole('button', { name: /Apply/i });
    
    fireEvent.change(startDateInput, { target: { value: '2025-08-10' } });
    fireEvent.click(recurrenceTypeButton);
    fireEvent.click(applyButton);

    await waitFor(() => {
      const upcomingDatesHeader = screen.getByText(/Upcoming Dates/i);
      expect(upcomingDatesHeader).toBeInTheDocument();

      const firstDate = screen.getByText(/Sun, Aug 10, 2025/i);
      expect(firstDate).toBeInTheDocument();
    });

    expect(handleDatesChange).toHaveBeenCalled();
    expect(handleDatesChange.mock.calls[0][0].length).toBeGreaterThan(0);
    expect(handleDatesChange.mock.calls[0][0][0].getFullYear()).toBe(2025);
  });
});