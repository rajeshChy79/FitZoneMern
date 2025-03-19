import React from 'react';
import { Link } from 'react-router-dom';

const Trainer = ({ img, alt, id, name, age }) => {
  return (
    <div className="backdrop-blur-md bg-white/20 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 text-center">
      <img src={img} alt={alt} className="w-full mx-auto rounded-t-lg" />
      <div className="p-4 sm:p-5 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{name}</h3>
        <p className="text-gray-300 text-sm sm:text-md">Age: {age}</p>
        <div className="mt-2 sm:mt-3">
          <Link
            to={`trainer/${id}`}
            className="mt-4 inline-block bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-colors duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trainer;