// HeroSection.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative glow card w-full min-h-screen bg-gradient-to-b from-[#0a112c] to-[#0c112c] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <motion.div
          className="text-center lg:text-left max-w-xl mx-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-300 leading-tight">
            Plan <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 bg-clip-text text-transparent">Smarter</span>, <br /> Achieve More 🚀
          </h1>
          <p className="mt-6 text-lg text-gray-500">
            Organize your tasks, set your goals, and stay motivated with a
            beautiful planner designed to feel like your best friend.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              className="px-6 py-3 button-shimmer bg-indigo-600 text-white text-lg rounded-xl shadow-lg hover:bg-indigo-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95}}
              onClick={() => navigate("/auth")}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-6 py-3 border border-gray-300 text-gray-300 text-lg rounded-xl shadow hover:bg-gray-100 hover:text-gray-950 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/learn-more")}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side Illustration */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/Icons.png"
            alt="Hero Illustration"
            className="w-full max-w-full max-h-fit lg:w-180 my-6"
          />
        </motion.div>
      </div>
    </section>
  );
}
