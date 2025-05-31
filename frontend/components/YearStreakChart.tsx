import React, { useMemo, useState } from "react";
import {
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  format,
  getDay,
  addDays,
  differenceInCalendarWeeks,
  isSameDay,
  isBefore,
  isAfter,
  startOfWeek,
  getMonth,
} from "date-fns";

type ActivityData = {
  [date: string]: number; // 'yyyy-MM-dd' -> activity count
};

interface YearStreakChartProps {
  year?: number;
  activityData: ActivityData; // activity counts keyed by date string
}

const colorLevels = [
  "bg-gray-200",   // 0: no activity
  "bg-red-300",    // 1–6
  "bg-orange-400", // 7–14
  "bg-green-300",  // 15–20
  "bg-green-600",  // 21+
];


// Map activity count to color index (0-4)
function getColorIndex(streak: number) {
  if (streak >= 21) return 4; // green
  if (streak >= 15) return 3; // light green
  if (streak >= 7) return 2;  // orange
  if (streak >= 1) return 1;  // red
  return 0; // no streak
}


const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const YearStreakChart: React.FC<YearStreakChartProps> = ({
  year = new Date().getFullYear(),
  activityData,
}) => {
  // Debug logging
  console.log('YearStreakChart props:', { year, activityData });

  // Year start and end
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(yearStart);

  // GitHub-style: weeks start on Sunday
  const firstSunday = startOfWeek(yearStart, { weekStartsOn: 0 });

  // Total weeks in the year view (from firstSunday to yearEnd)
  const totalWeeks =
    differenceInCalendarWeeks(yearEnd, firstSunday, { weekStartsOn: 0 }) + 1;

  // Generate all days from firstSunday to yearEnd (cover all weeks fully)
  const allDays = eachDayOfInterval({ start: firstSunday, end: yearEnd });

  // Debug logging for grid generation
  console.log('Grid data:', {
    yearStart: yearStart.toISOString(),
    yearEnd: yearEnd.toISOString(),
    totalWeeks,
    firstSunday: firstSunday.toISOString(),
    allDaysCount: allDays.length
  });

  // Tooltip state and positioning
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
    count: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const formattedDate = format(date, "MMMM dd, yyyy");
    const streakText = count > 0 
      ? `🔥 ${count} day${count !== 1 ? 's' : ''} streak`
      : 'No activity';
    
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top - 10 + window.scrollY,
      content: `${formattedDate}\n${streakText}`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((t) => ({ ...t, visible: false }));
  };

  // Calculate month label positions (for top)
  // We'll render month name above first column of that month
  const monthPositions = useMemo(() => {
    const positions: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    for (let i = 0; i < totalWeeks; i++) {
      // Find the Sunday of the week
      const weekStart = addDays(firstSunday, i * 7);
      const month = getMonth(weekStart);
      if (month !== lastMonth && weekStart >= yearStart && weekStart <= yearEnd) {
        positions.push({ month: monthLabels[month], weekIndex: i });
        lastMonth = month;
      }
    }

    return positions;
  }, [firstSunday, totalWeeks, yearStart, yearEnd]);

  return (
    <div className="relative select-none max-w-[800px] mx-auto">
      {/* Month Labels */}
      <div className="flex ml-8 mb-1">
        {Array.from({ length: totalWeeks }).map((_, i) => {
          const label = monthPositions.find((m) => m.weekIndex === i);
          return (
            <div
              key={i}
              style={{ width: 16, height: 16 }}
              className="text-[10px] font-semibold text-gray-500 text-center"
            >
              {label ? label.month : ""}
            </div>
          );
        })}
      </div>

      <div className="flex">
        {/* Day Labels */}
        <div className="flex flex-col mr-2 h-[112px] justify-between text-[10px] text-gray-500 font-medium leading-none" aria-hidden="true">
          {dayLabels.map((day, index) => (
            <span key={day} style={{ height: 16 }}>{day}</span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex space-x-[2px]">
          {Array.from({ length: totalWeeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-[2px]">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const currentDate = addDays(firstSunday, weekIndex * 7 + dayIndex);

                // Only color days inside the current year, else gray transparent block
                const inYear =
                  !isBefore(currentDate, yearStart) &&
                  !isAfter(currentDate, yearEnd);

                const dateKey = format(currentDate, "yyyy-MM-dd");
                const count = activityData[dateKey] || 0;
                const colorClass = getColorIndex(count);
                const bgClass = colorLevels[colorClass];

                const isToday = dateKey === format(new Date(), "yyyy-MM-dd");
const isRecentlyUpdated = isToday && count > 0;


                // Animate squares: scale and opacity when they appear or change
                return (
                  <div
                    key={dayIndex}
                    role="button"
                    tabIndex={0}
                    aria-label={`${format(
                      currentDate,
                      "EEEE, MMMM do yyyy"
                    )}: ${count} activit${count !== 1 ? "ies" : "y"}`}
                    onMouseEnter={(e) =>
                      inYear && handleMouseEnter(e, currentDate, count)
                    }
                    onMouseLeave={handleMouseLeave}
                    onFocus={(e) =>
                      inYear && handleMouseEnter(e, currentDate, count)
                    }
                    onBlur={handleMouseLeave}
                    className={`w-4 h-4 rounded-sm cursor-pointer transition-transform duration-300 ease-in-out transform
  ${inYear ? bgClass : "bg-transparent"}
  ${isRecentlyUpdated ? "animate-ping-slow" : ""}
`}

                    style={{ opacity: inYear ? 1 : 0.2 }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          role="tooltip"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            position: "absolute",
            transform: "translate(-50%, -100%)",
            backgroundColor: "rgba(31, 41, 55, 0.95)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "13px",
            pointerEvents: "none",
            zIndex: 9999,
            whiteSpace: "pre-line",
            userSelect: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
            minWidth: "140px",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default YearStreakChart;
