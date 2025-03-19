import React from "react";

const ButtonOutline = ({ text, onClick }) => {
  return (
    <button
      type="button"
      className="px-6 py-2 font-semibold border border-white text-white text-lg rounded-md 
        transition-all duration-300 hover:bg-white hover:text-black focus:ring-2 focus:ring-white focus:outline-none"
      onClick={onClick} // Allows for dynamic button actions
      aria-label={text} // Improves accessibility
    >
      {text}
    </button>
  );
};

export default ButtonOutline;
