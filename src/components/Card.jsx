import React from "react";
import { motion } from "framer-motion";

/**
 * Enhanced dashboard card with modern styling, animations, and full-width content.
 * Features gradient borders, glass morphism effect, and smooth hover animations.
 */
const Card = ({ title, children, className = "", icon: Icon }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className={[
        "group relative h-full w-full rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-white/10 via-white/5 to-white/2",
        "backdrop-blur-xl border border-white/10",
        "shadow-2xl hover:shadow-3xl",
        "transition-all duration-500 p-6 flex flex-col",
        "before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-gradient-to-br before:from-purple-500/10 before:via-transparent before:to-pink-500/10",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        className,
      ].join(" ")}
    >
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
      
      {/* Floating orbs */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
      <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-300" />

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        {title && (
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {Icon && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon size={18} className="text-purple-400 group-hover:text-purple-300" />
              </div>
            )}
            <h2 className="text-xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
              {title}
            </h2>
            
            {/* Decorative line */}
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-transparent ml-4 group-hover:from-purple-400/50 group-hover:via-pink-400/50 transition-colors duration-300" />
          </motion.div>
        )}

        {/* Stretchable content area with enhanced styling */}
        <motion.div 
          className="flex-1 w-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-full w-full">
            {children}
          </div>
          
          {/* Content shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.section>
  );
};

export default Card;
