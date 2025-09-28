// src/components/SidebarMenu.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home,ClipboardList, Calendar, Target, Menu } from "lucide-react";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors ${
      location.pathname === path ? "bg-slate-800 text-green-400" : ""
    }`;

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-slate-900 text-white min-h-screen p-4 flex flex-col transition-all duration-300 border-r border-white/10`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between mb-8">
        {/* Keep space for logo even if hidden */}
        <h1
          className={`text-2xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${
            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
          }`}
        >
          TaskBuddy
        </h1>

        {/* Toggle always visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-slate-800 ml-auto"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className={linkClasses("/dashboard")}>
          <Home size={22} />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link to="/daily" className={linkClasses("/daily")}>
          <ClipboardList size={22} />
          {isOpen && <span>Daily Tasks</span>}
        </Link>
        <Link to="/weekly" className={linkClasses("/weekly")}>
          <Calendar size={22} />
          {isOpen && <span>Weekly Tasks</span>}
        </Link>
        <Link to="/goals" className={linkClasses("/goals")}>
          <Target size={22} />
          {isOpen && <span>Goals</span>}
        </Link>
      </nav>
    </div>
  );
}
