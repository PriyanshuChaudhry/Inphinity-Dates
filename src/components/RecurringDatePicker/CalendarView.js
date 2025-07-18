import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = ({ currentMonth, prevMonth, nextMonth, selectedDates }) => {
  const isDateSelected = (date) => {
    return selectedDates.some(selectedDate => 
      selectedDate.toDateString() === date.toDateString()
    );
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
   
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = isDateSelected(date);
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-full cursor-pointer transition-colors ${
            isSelected
              ? 'bg-blue-500 text-white'
              : isToday
              ? 'bg-gray-200 text-gray-900'
              : 'hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-4 border">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h4 className="font-semibold">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendarView;