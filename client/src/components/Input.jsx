import React from 'react';

const Input = ({ type, name, placeholder, value, onChange, pattern, minLength, maxLength }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      pattern={pattern}
      minLength={minLength}
      maxLength={maxLength}
      required
      className="w-full max-w-[750px] px-7 py-3 rounded-md border-none outline-none bg-white/20 text-white placeholder:text-gray-400 placeholder:font-medium font-medium focus:ring-2 focus:ring-yellow-400 transition-all"
    />
  );
};

export default Input;