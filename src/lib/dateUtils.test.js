import { generateRecurringDates } from './dateUtils';

describe('generateRecurringDates', () => {

  it('should generate correct daily recurring dates', () => {
    const dates = generateRecurringDates(
      '2025-07-20', 
      '2025-07-22', 
      'daily',     
      1,            
      [], null, null, null 
    );
    expect(dates.length).toBe(3);
    expect(dates[0].toDateString()).toBe(new Date('2025-07-20').toDateString());
    expect(dates[1].toDateString()).toBe(new Date('2025-07-21').toDateString());
    expect(dates[2].toDateString()).toBe(new Date('2025-07-22').toDateString());
  });

  it('should generate correct weekly recurring dates', () => {
    const dates = generateRecurringDates(
      '2025-07-01',
      '2025-07-14', 
      'weekly',
      1,
      [2, 4], 
      null, null, null
    );
    expect(dates.length).toBe(4); 
    expect(dates[0].toDateString()).toBe(new Date('2025-07-01').toDateString()); 
    expect(dates[1].toDateString()).toBe(new Date('2025-07-03').toDateString()); 
    expect(dates[2].toDateString()).toBe(new Date('2025-07-08').toDateString()); 
    expect(dates[3].toDateString()).toBe(new Date('2025-07-10').toDateString()); 
  });

  it('should generate correct monthly recurring dates on the same date', () => {
    const dates = generateRecurringDates(
      '2025-01-15', 
      '2025-03-20', 
      'monthly',    
      1,            
      [],           
      'date',       
      null, null
    );
    expect(dates.length).toBe(3);
    expect(dates[0].toDateString()).toBe(new Date('2025-01-15').toDateString());
    expect(dates[1].toDateString()).toBe(new Date('2025-02-15').toDateString());
    expect(dates[2].toDateString()).toBe(new Date('2025-03-15').toDateString());
  });

});