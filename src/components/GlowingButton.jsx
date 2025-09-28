import React from "react";

const GlowingButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-xl
                 shadow-[0_0_20px_rgba(168,85,247,0.5)]
                 hover:shadow-[0_0_35px_rgba(168,85,247,0.8)]
                 transition-all duration-300 ease-out
                 before:absolute before:inset-0 before:rounded-xl
                 before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 before:opacity-0
                 hover:before:opacity-100 overflow-hidden"
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GlowingButton;
