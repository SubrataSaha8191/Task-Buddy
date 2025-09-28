import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-10 p-6 bg-transparent text-white absolute w-full top-0 z-50">
      <Link to = "/" className="text-2xl font-bold hover:text-purple-400 cursor-pointer">TaskBuddy</Link>
      <ul className="hidden md:flex space-x-6">
        <Link to = "/Dashboard" className="hover:text-purple-400 cursor-pointer">Dashboard</Link>
        <Link to = "/daily" className="hover:text-purple-400 cursor-pointer">Daily Tasks</Link>
        <Link to = "/weekly" className="hover:text-purple-400 cursor-pointer">Weekly Tasks</Link>
        <Link to = "/goals" className="hover:text-purple-400 cursor-pointer">Goals</Link>
      </ul>
    </nav>
  );
}
