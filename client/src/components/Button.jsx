import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="px-6 py-3 font-semibold text-black bg-white border border-white rounded-md text-lg
       transition-all duration-300 hover:scale-105 hover:bg-gray-200 focus:ring-2 focus:ring-white"
      onClick={onClick}
      aria-label={text}
    >
      {text}
    </button>
  );
};

export default Button;
