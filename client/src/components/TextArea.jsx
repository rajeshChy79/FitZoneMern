import React from 'react';

const TextArea = ({ message, name, value, onChange, placeholder }) => {
  return (
    <textarea
      name={name}
      cols="30"
      rows="10"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full max-w-[750px] px-7 py-3 rounded-md border-none outline-none bg-white/20 text-white placeholder:text-gray-400 placeholder:font-medium font-medium focus:ring-2 focus:ring-yellow-400 transition-all"
    >
      {message}
    </textarea>
  );
};

export default TextArea;