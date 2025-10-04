import React from "react";
import Card from "../components/Card";
import { BookOpen, Calendar, Target, BarChart } from "lucide-react";

const LearnMore = () => {
  const features = [
    {
      icon: <BarChart className="w-10 h-10 text-blue-400" />,
      title: "Dashboard",
      description:
        "Get a bird’s-eye view of your productivity. Track daily and weekly progress, view tasks at a glance, and stay motivated with visual progress bars.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-green-400" />,
      title: "Daily Tasks",
      description:
        "Stay on top of your everyday priorities. Add tasks with due dates, time slots, and categories to keep your schedule crystal clear.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-purple-400" />,
      title: "Weekly Tasks",
      description:
        "Plan your week effectively. Organize tasks across the week, track what’s ahead, and balance workload without overwhelm.",
    },
    {
      icon: <Target className="w-10 h-10 text-pink-400" />,
      title: "Goals",
      description:
        "Set and achieve your long-term objectives. Break big goals into smaller tasks and watch your progress unfold step by step.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-orange-400" />,
      title: "Smart Reminders (Coming Soon 🚀)",
      description:
        "Never miss a deadline! Get automatic reminders via email before your task is due, keeping you ahead of the curve.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover TaskBuddy</h1>
        <p className="text-lg text-slate-300">
          TaskBuddy isn’t just a to-do list — it’s your personal productivity
          partner. Here’s how it makes your life easier:
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-slate-800 border border-slate-700 shadow-xl rounded-2xl hover:scale-105 transform transition duration-300 flex flex-col items-center text-center p-6"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-300">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Call-to-action */}
      <div className="text-center mt-16">
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 px-8 py-4 rounded-xl shadow-lg text-lg font-semibold"
          onClick={() => (window.location.href = "/auth")}
        >
          Get Started with TaskBuddy 
        </button>
      </div>
    </div>
  );
};

export default LearnMore;
