import React from "react";

/**
 * Generic dashboard card with consistent styling and full-width content.
 * Children get a stretchable container so components like TaskProgress
 * can use 100% width without being squeezed.
 */
const Card = ({ title, children, className = "" }) => {
  return (
    <section
      className={[
        "h-full w-full rounded-2xl bg-white/5 backdrop-blur-xl",
        "border border-white/10 shadow-xl hover:shadow-2xl",
        "transition-all duration-300 p-6 flex flex-col",
        className,
      ].join(" ")}
    >
      <h2 className="text-xl font-semibold text-white mb-4 text-center">
        {title}
      </h2>

      {/* Stretchable content area */}
      <div className="flex-1 w-full">
        {children}
      </div>
    </section>
  );
};

export default Card;
