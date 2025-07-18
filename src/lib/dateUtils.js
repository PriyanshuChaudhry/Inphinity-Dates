
export const generateRecurringDates = (
  startDate,
  endDate,
  recurrenceType,
  customInterval,
  selectedDaysOfWeek,
  monthlyPattern,
  monthlyDay,
  monthlyDayOfWeek
) => {
  if (!startDate || !recurrenceType) return [];

  const dates = [];
  const start = new Date(startDate);
  start.setUTCHours(12, 0, 0, 0);

  const end = endDate ? new Date(endDate) : new Date(start.getTime() + 365 * 24 * 60 * 60 * 1000);
  if (endDate) {
    end.setUTCHours(23, 59, 59, 999);
  }

  let current = new Date(start);

  const monthlyDaysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  while (current <= end) {
    switch (recurrenceType) {
      case 'daily':
        if (current <= end) dates.push(new Date(current));
        current.setDate(current.getDate() + customInterval);
        break;

      case 'weekly':
        if (selectedDaysOfWeek.length === 0) {
            if (current <= end) dates.push(new Date(current));
             current.setDate(current.getDate() + (7 * customInterval));
        } else {
            let tempDate = new Date(current);
            for(let i = 0; i < 7; i++) {
                if (tempDate <= end && selectedDaysOfWeek.includes(tempDate.getDay()) && tempDate >= start) {
                    if (!dates.some(d => d.getTime() === tempDate.getTime())) {
                        dates.push(new Date(tempDate));
                    }
                }
                tempDate.setDate(tempDate.getDate() + 1);
            }
            current.setDate(current.getDate() + (7 * customInterval));
        }
        break;

      case 'monthly':
        if (monthlyPattern === 'date') {
          const dayOfMonth = start.getUTCDate();
          let potentialDate = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), dayOfMonth, 12));
          
          if (potentialDate.getUTCMonth() === current.getUTCMonth() && potentialDate <= end && potentialDate >= start) {
            dates.push(potentialDate);
          }
          current.setUTCMonth(current.getUTCMonth() + customInterval);
        } else {
          const targetDate = getNthDayOfMonth(current, monthlyDay, monthlyDayOfWeek, monthlyDaysOfWeek);
          if (targetDate && targetDate <= end && targetDate >= start) {
            dates.push(new Date(targetDate));
          }
          current.setUTCMonth(current.getUTCMonth() + customInterval);
        }
        break;

      case 'yearly':
        if (current <= end) dates.push(new Date(current));
        current.setFullYear(current.getFullYear() + customInterval);
        break;

      default:
        return [];
    }
    if (dates.length > 500) break;
  }
  
  dates.sort((a, b) => a - b);

  return dates;
};

export const getNthDayOfMonth = (monthStart, nth, dayOfWeek, monthlyDaysOfWeek) => {
  const dayIndex = monthlyDaysOfWeek.indexOf(dayOfWeek);
  const monthlyDays = ['first', 'second', 'third', 'fourth', 'last'];

  if (nth === 'last') {
    const lastDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    let targetDate = new Date(lastDayOfMonth);
    while (targetDate.getDay() !== dayIndex) {
      targetDate.setDate(targetDate.getDate() - 1);
    }
    return targetDate;
  } else {
    let firstOccurrence = 1;
    while (new Date(monthStart.getFullYear(), monthStart.getMonth(), firstOccurrence).getDay() !== dayIndex) {
      firstOccurrence++;
    }
    const nthValue = monthlyDays.indexOf(nth);
    let targetDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), firstOccurrence + (nthValue * 7));
    
    if (targetDate.getMonth() === monthStart.getMonth()) {
      return targetDate;
    }
  }

  return null;
};


export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};