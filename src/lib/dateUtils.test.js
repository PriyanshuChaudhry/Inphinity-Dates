// src/lib/dateUtils.test.js
import { generateRecurringDates } from './dateUtils';

describe('generateRecurringDates', () => {

  // Test case for daily recurrence
  it('should generate correct daily recurring dates', () => {
    const dates = generateRecurringDates(
      '2025-07-20', // Start Date
      '2025-07-22', // End Date
      'daily',      // Recurrence Type
      1,            // Interval
      [], null, null, null // Other params not needed for daily
    );
    expect(dates.length).toBe(3);
    expect(dates[0].toDateString()).toBe(new Date('2025-07-20').toDateString());
    expect(dates[1].toDateString()).toBe(new Date('2025-07-21').toDateString());
    expect(dates[2].toDateString()).toBe(new Date('2025-07-22').toDateString());
  });

  // Test case for weekly recurrence on specific days
  it('should generate correct weekly recurring dates', () => {
    const dates = generateRecurringDates(
      '2025-07-01',
      '2025-07-14', // <-- Change end date to make expectation of 4 correct
      'weekly',
      1,
      [2, 4], 
      null, null, null
    );
    expect(dates.length).toBe(4); // Now this is correct
    expect(dates[0].toDateString()).toBe(new Date('2025-07-01').toDateString()); // Tue
    expect(dates[1].toDateString()).toBe(new Date('2025-07-03').toDateString()); // Thu
    expect(dates[2].toDateString()).toBe(new Date('2025-07-08').toDateString()); // Next Tue
    expect(dates[3].toDateString()).toBe(new Date('2025-07-10').toDateString()); // Next Thu
  });

  // Test case for monthly recurrence
  it('should generate correct monthly recurring dates on the same date', () => {
    const dates = generateRecurringDates(
      '2025-01-15', // Start Date
      '2025-03-20', // End Date
      'monthly',    // Recurrence Type
      1,            // Interval
      [],           // No weekly days
      'date',       // Monthly pattern
      null, null
    );
    expect(dates.length).toBe(3);
    expect(dates[0].toDateString()).toBe(new Date('2025-01-15').toDateString());
    expect(dates[1].toDateString()).toBe(new Date('2025-02-15').toDateString());
    expect(dates[2].toDateString()).toBe(new Date('2025-03-15').toDateString());
  });

});