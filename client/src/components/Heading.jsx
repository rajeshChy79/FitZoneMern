import React from "react";

const Heading = ({ name }) => {
  return (
    <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center tracking-wide relative pb-2">
      {name}
      {/* Gradient underline effect */}
      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-400 to-white rounded-full transition-all duration-300 group-hover:w-40"></span>
    </h2>
  );
};

export default Heading;
