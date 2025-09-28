import React from "react";
import NotificationBanner from "../components/NotificationBanner";
import SidebarMenu from "../components/SidebarMenu";
import Card from "../components/Card";
import GoalList from "../components/GoalList";
import DailyProgress from "../components/DailyProgress";
import WeeklyProgress from "../components/WeeklyProgress";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const today = new Date().toISOString().split("T")[0];

  // ----- Week range (Mon–Sun) without mutating the same Date object -----
  const now = new Date();
  const day = now.getDay(); // 0 Sun -> 6 Sat
  const diffToMonday = (day + 6) % 7;

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(now.getDate() - diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const weekStart = start.toISOString().split("T")[0];
  const weekEnd = end.toISOString().split("T")[0];
  // ----------------------------------------------------------------------

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Decorative blobs */}
      <div className="absolute -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <NotificationBanner />

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 auto-rows-[minmax(0,1fr)] items-stretch">
          
          {/* Row 1 */}
          <Card title="Progress Overview" className="h-full">
            <div className="flex flex-col space-y-4">
              <DailyProgress />
              <hr className="border-gray-700" />
              <WeeklyProgress />
            </div>
          </Card>


          <Card title="Today's Tasks" className="h-full">
            <TaskList type="daily" dateFilter={today} />
          </Card>

          <Card title="Weekly Tasks" className="h-full">
            <TaskList type="weekly" weekFilter={{ start: weekStart, end: weekEnd }} />
          </Card>

          {/* Row 3 */}
          <Card title="Goals" className=" justify-center text-center lg:flex">
            <GoalList />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
