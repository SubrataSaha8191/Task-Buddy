// HeroSection.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Target, 
  Calendar, 
  TrendingUp,
  Play,
  Star,
  Users,
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Heart
} from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const statsData = [
    { icon: Users, value: "10K+", label: "Happy Users" },
    { icon: CheckCircle, value: "100K+", label: "Tasks Completed" },
    { icon: Award, value: "50K+", label: "Goals Achieved" },
    { icon: Star, value: "4.9", label: "Rating" },
  ];

  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Strong Background Overlay to hide unwanted content */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Additional dark overlay for complete coverage */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Animated geometric shapes - rotating square positioned behind the "A" in Achieve */}
      <motion.div
        className="absolute top-[18%] left-[6%] w-20 h-20 border-2 border-purple-400/30 rounded-lg"
        style={{ zIndex: 1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-16 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-blue-400/40 rounded-full"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 lg:px-16 relative" style={{ zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8 relative" style={{ zIndex: 15 }}>
            {/* Badge */}

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">
                  <span className="text-white">Plan </span>
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                    Smarter
                  </span>
                </span>
                <span className="block mt-2">
                  <span className="text-white">Achieve </span>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                    More 
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              Transform your productivity with our intelligent task manager. 
              Organize, prioritize, and accomplish your goals with beautiful 
              design and powerful features.
            </motion.p>

            {/* Features List */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {[
                { icon: CheckCircle, text: "Smart Task Management" },
                { icon: Target, text: "Goal Tracking" },
                { icon: Calendar, text: "Time Planning" },
                { icon: TrendingUp, text: "Progress Analytics" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <feature.icon size={16} className="text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => navigate("/auth?mode=signup")}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Get Started Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => navigate("/learn-more")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Play size={20} />
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Modern Animated Dashboard */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center items-center"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
            
            {/* Main Dashboard Container */}
            <motion.div
              className="relative z-10 w-full max-w-md"
              variants={floatingVariants}
              animate="animate"
            >
              {/* Dashboard Frame */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">TaskBuddy</p>
                      <p className="text-gray-400 text-xs">Your Progress</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.75 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">75%</p>
                        <p className="text-xs text-gray-400">Complete</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task Items */}
                <div className="space-y-3">
                  {[
                    { text: "Morning workout", completed: true, time: "30m" },
                    { text: "Review project proposal", completed: true, time: "45m" },
                    { text: "Team meeting prep", completed: false, time: "20m" },
                  ].map((task, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.2 }}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        task.completed ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                        {task.completed && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                          {task.text}
                        </p>
                      </div>
                      <span className="text-xs text-purple-400">{task.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating notification cards */}
              <motion.div
                className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-xl text-xs font-medium shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                +5 XP Earned!
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-3 py-2 rounded-xl text-xs font-medium shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                Streak: 7 days 🔥
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon size={24} className="text-purple-400" />
              </div>
              <motion.p
                className="text-3xl font-bold text-white mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            Join the ranks of the successful and boost your productivity with TaskBuddy
          </p>
        </motion.div>
      </div>
    </section>
    <Footer />
    </>
  );
}
