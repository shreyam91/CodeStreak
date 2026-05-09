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
  "bg-muted",   // 0: no activity
  "bg-green-200 dark:bg-green-900/40",    // 1–6
  "bg-green-400 dark:bg-green-700/60", // 7–14
  "bg-green-500 dark:bg-green-600",  // 15–20
  "bg-green-600 dark:bg-green-500",  // 21+
];

// Map activity count to color index (0-4)
function getColorIndex(streak: number) {
  if (streak >= 21) return 4;
  if (streak >= 15) return 3;
  if (streak >= 7) return 2;
  if (streak >= 1) return 1;
  return 0;
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
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(yearStart);
  const firstSunday = startOfWeek(yearStart, { weekStartsOn: 0 });

  const totalWeeks = differenceInCalendarWeeks(yearEnd, firstSunday, { weekStartsOn: 0 }) + 1;

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
    const container = e.currentTarget.closest('.chart-container');
    
    let x = 0;
    let y = 0;
    
    if (container) {
      const containerRect = container.getBoundingClientRect();
      x = rect.left - containerRect.left + (rect.width / 2);
      y = rect.top - containerRect.top - 10;
    }

    const formattedDate = format(date, "MMMM dd, yyyy");
    const streakText = count > 0 
      ? `${count} submission${count !== 1 ? 's' : ''}`
      : 'No activity';
    
    setTooltip({
      visible: true,
      x,
      y,
      content: `${formattedDate}\n${streakText}`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((t) => ({ ...t, visible: false }));
  };

  const monthPositions = useMemo(() => {
    const positions: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    for (let i = 0; i < totalWeeks; i++) {
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
    <div className="relative select-none w-max mx-auto chart-container">
      {/* Month Labels */}
      <div className="flex ml-8 mb-1 relative h-4">
        {monthPositions.map((label, idx) => (
          <div
            key={idx}
            style={{ position: 'absolute', left: label.weekIndex * 12 }}
            className="text-[10px] font-semibold text-muted-foreground"
          >
            {label.month}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Day Labels */}
        <div className="flex flex-col mr-2 justify-between text-[10px] text-muted-foreground font-medium leading-none" style={{ height: '94px' }} aria-hidden="true">
          {dayLabels.map((day, index) => (
            <span key={day} className={`${index % 2 === 0 ? 'invisible' : ''}`} style={{ height: '12px' }}>{day}</span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex space-x-0.5">
          {Array.from({ length: totalWeeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-0.5">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const currentDate = addDays(firstSunday, weekIndex * 7 + dayIndex);

                const inYear = !isBefore(currentDate, yearStart) && !isAfter(currentDate, yearEnd);

                const dateKey = format(currentDate, "yyyy-MM-dd");
                const count = activityData[dateKey] || 0;
                const colorClass = getColorIndex(count);
                const bgClass = colorLevels[colorClass];

                return (
                  <div
                    key={dayIndex}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={(e) => inYear && handleMouseEnter(e, currentDate, count)}
                    onMouseLeave={handleMouseLeave}
                    className={`w-2.5 h-2.5 rounded-[2px] transition-transform duration-200 hover:scale-125 hover:z-10 relative
                      ${inYear ? bgClass : "bg-transparent pointer-events-none"}
                    `}
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
            backgroundColor: "hsl(var(--foreground))",
            color: "hsl(var(--background))",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 9999,
            whiteSpace: "pre-line",
            textAlign: "center",
            fontWeight: 500,
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default YearStreakChart;
