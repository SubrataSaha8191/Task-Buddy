import React from "react";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";
import SidebarMenu from "../components/SidebarMenu";
import { useGoals } from "../context/GoalContext";

const Card = ({ title, children }) => (
  <div className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
    {title && <h2 className="text-xl font-semibold text-white mb-4 text-center">{title}</h2>}
    {children}
  </div>
);

const Goals = () => {
  const {dispatch} = useGoals();
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Animated blobs */}
      <div className="absolute -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-24 left-16 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-24 right-16 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
      </div>

      {/* Main */}
      <main className="flex-1 p-8 space-y-8">
        <h1 className="text-3xl font-bold">🎯 Goals & Planning</h1>

        <Card title="Add New Goal">
          {/* Wrapper gives uniform input styling */}
          <div className="tb-form">
            <GoalForm
              onAddGoal={(goal) =>
              dispatch({
                type: "ADD_GOAL",
                payload: { ...goal, id: Date.now(), subtasks: [] }, // add id + subtasks
              })
            } 
            />
          </div>
        </Card>

        <Card title="Your Goals">
          <div className="min-h-32 flex items-center justify-center">
            <GoalList />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Goals;
