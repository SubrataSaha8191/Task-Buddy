import SidebarMenu from "../components/SidebarMenu";
import TaskProgress from "../components/TaskProgress";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import WeeklyProgress from "../components/WeeklyProgress";

const WeeklyTasks = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Background blobs */}
      <div className="absolute -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center">Weekly Tasks</h2>

        <WeeklyProgress />

        {/* Task Form (with date picker) */}
        <TaskForm type="weekly" showDateInput={true} />

        {/* Task List */}
        <TaskList type="weekly" />
      </div>
    </div>
  );
};

export default WeeklyTasks;
