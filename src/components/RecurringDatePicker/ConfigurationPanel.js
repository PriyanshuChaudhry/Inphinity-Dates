import { Settings, X, Check } from "lucide-react";
import { useDatePicker } from "./DatePickerContext";

const ConfigurationPanel = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    recurrenceType,
    setRecurrenceType,
    customInterval,
    setCustomInterval,
    selectedDaysOfWeek,
    toggleDayOfWeek,
    monthlyPattern,
    setMonthlyPattern,
    monthlyDay,
    setMonthlyDay,
    monthlyDayOfWeek,
    setMonthlyDayOfWeek,
    resetConfiguration,
    applyConfiguration,
  } = useDatePicker();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthlyDays = ["first", "second", "third", "fourth", "last"];
  const monthlyDaysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return (
    <div className="space-y-6">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Settings className="mr-2 text-gray-600" />
          Configuration
        </h2>

        <div className="space-y-3 mb-4">
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date *
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recurrence Type *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["daily", "weekly", "monthly", "yearly"].map((type) => (
              <button
                key={type}
                onClick={() => setRecurrenceType(type)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  recurrenceType === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {recurrenceType && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repeat every
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="12"
                value={customInterval}
                onChange={(e) =>
                  setCustomInterval(parseInt(e.target.value, 10))
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {recurrenceType === "daily"
                  ? customInterval > 1
                    ? "days"
                    : "day"
                  : recurrenceType.slice(0, -2) +
                    (customInterval > 1 ? "s" : "")}
              </span>
            </div>
          </div>
        )}

        {recurrenceType === "weekly" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Days of the Week
            </label>
            <div className="grid grid-cols-4 lg:grid-cols-7 gap-1">
              {daysOfWeek.map((day, index) => (
                <button
                  key={day}
                  onClick={() => toggleDayOfWeek(index)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    selectedDaysOfWeek.includes(index)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        )}

        {recurrenceType === "monthly" && (
          <div className="mb-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Pattern
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="monthlyPattern"
                      value="date"
                      checked={monthlyPattern === "date"}
                      onChange={(e) => setMonthlyPattern(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Same date each month</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="monthlyPattern"
                      value="day"
                      checked={monthlyPattern === "day"}
                      onChange={(e) => setMonthlyPattern(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Same day pattern</span>
                  </label>
                </div>
              </div>

              {monthlyPattern === "day" && (
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={monthlyDay}
                    onChange={(e) => setMonthlyDay(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {monthlyDays.map((day) => (
                      <option key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={monthlyDayOfWeek}
                    onChange={(e) => setMonthlyDayOfWeek(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {monthlyDaysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-2 pt-4 border-t">
          <button
            onClick={applyConfiguration}
            disabled={!startDate || !recurrenceType}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Check className="mr-2 w-4 h-4" />
            Apply
          </button>
          <button
            onClick={resetConfiguration}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <X className="mr-2 w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
