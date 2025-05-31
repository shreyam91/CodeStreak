'use client'

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import PomodoroTimer from "@/components/PomodoroTimer";
// import StreakCounter from "@/components/StreakCounter";
import TaskForm from "@/components/TaskForm";
import { HiFire, HiOutlineFire } from "react-icons/hi";
import { useStreak } from "@/app/path/to/useStreak";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import YearStreakChart from "@/components/YearStreakChart"; // <-- Import here
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  const { streak, loggedToday, incrementStreak, history, loading } = useStreak();

  // Debug logging
  console.log('Streak Data:', {
    streak,
    loggedToday,
    history,
    loading
  });

  // Mock data generation inside the page
  // const generateMockActivityData = () => {
  //   const data: { [date: string]: number } = {};
  //   const today = new Date();
  //   const yearStart = new Date(today.getFullYear(), 0, 1);
  //   const yearEnd = new Date(today.getFullYear(), 11, 31);

  //   for (
  //     let d = yearStart;
  //     d <= yearEnd;
  //     d = new Date(d.getTime() + 24 * 60 * 60 * 1000)
  //   ) {
  //     const day = d.getDay();
  //     const count =
  //       day === 0 || day === 6
  //         ? Math.floor(Math.random() * 2)
  //         : Math.floor(Math.random() * 8);
  //     data[d.toISOString().split("T")[0]] = count;
  //   }
  //   return data;
  // };

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
         <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Fire icon + count on right */}
      <div
        onClick={incrementStreak}
        className="flex items-center gap-1 text-red-500 font-semibold cursor-pointer select-none"
        title="Log today's streak"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") incrementStreak();
        }}
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
        ) : loggedToday ? (
          <HiFire size={20} />
        ) : (
          <HiOutlineFire size={20} />
        )}
        <span>{loading ? "..." : streak}</span>
      </div>
    </header>
    <div className="ml-5 flex space-x-4 ">
      <div className="mt-5 border-2 rounded-l rounded-r">

        <TaskForm />
      </div>
      <div className="mt-3 border-1 rounded-l rounded-r">

        <PomodoroTimer />
      </div>
</div>

          {/* Add YearStreakChart here */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w">
            <h2 className="text-xl font-semibold mb-4">Year Streak Activity</h2>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <YearStreakChart activityData={history} />
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
