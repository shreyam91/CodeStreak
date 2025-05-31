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
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top - 10 + window.scrollY,
      content: `${format(date, "MMM dd, yyyy")}: ${count} activity${count !== 1 ? "s" : ""}`,
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
    <div className="relative select-none">
      {/* Month Labels */}
      <div className="flex ml-10 mb-1">
        {Array.from({ length: totalWeeks }).map((_, i) => {
          const label = monthPositions.find((m) => m.weekIndex === i);
          return (
            <div
              key={i}
              style={{ width: 18, height: 18 }}
              className="text-xs font-semibold text-gray-500 text-center"
            >
              {label ? label.month : ""}
            </div>
          );
        })}
      </div>

      <div className="flex">
        {/* Day Labels */}
        <div className="flex flex-col mr-2 h-[126px] justify-between text-xs text-gray-500 font-medium leading-none" aria-hidden="true">
          {/* Show only some day labels for spacing like GitHub (Sun, Tue, Thu, Sat) */}
          <span>Sun</span>
          <span>Tue</span>
          <span>Thu</span>
          <span>Sat</span>
        </div>

        {/* Heatmap grid */}
        <div className="flex space-x-1">
          {Array.from({ length: totalWeeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-1">
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
                    className={`w-5 h-5 rounded-sm cursor-pointer transition-transform duration-300 ease-in-out transform
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
            backgroundColor: "rgba(31, 41, 55, 0.9)", // gray-900 with opacity
            color: "white",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            pointerEvents: "none",
            zIndex: 9999,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default YearStreakChart;
