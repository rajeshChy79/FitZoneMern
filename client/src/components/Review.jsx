import React from 'react';

const Review = ({ img, alt, name }) => {
  return (
    <div className="backdrop-blur-md bg-white/20 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 p-4 sm:p-6 flex flex-col items-center text-center gap-2">
      <img src={img} alt={alt} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-2 transition-transform duration-300" />
      <h3 className="text-lg sm:text-xl font-semibold text-white">{name}</h3>
      <p className="text-gray-300 text-sm sm:text-md font-medium lowercase">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ex quidem, mollitia minus velit laudantium aliquid? Ea tenetur amet deserunt.
      </p>
    </div>
  );
};

export default Review;