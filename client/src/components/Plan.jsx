import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonOutline } from "./";
import { exercisePng, planImg } from "../images";

const Plan = ({ name, img, alt, id, monthlyPrice, yearlyPrice }) => {
  return (
    <div className="backdrop-blur-md bg-white/20 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 p-4 sm:p-6 text-center relative">
      <div className="rounded-lg overflow-hidden">
        <img src={img || planImg} alt={alt || name} className="w-full object-cover rounded-md" />
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold mt-4 mb-2 text-white">{name}</h3>
      <div className="space-y-2">
        <p className="text-base sm:text-lg text-gray-300">Monthly: <span className="font-bold text-white">₹{monthlyPrice}</span></p>
        <p className="text-base sm:text-lg text-gray-300">Yearly: <span className="font-bold text-white">₹{yearlyPrice}</span></p>
      </div>
      <Link
        to={`/plan-detail/${id}`}
        className="mt-4 inline-block px-6 py-2 rounded-full font-semibold text-white hover:bg-yellow-400 hover:text-black transition-colors duration-300 bg-yellow-500"
      >
        Select Plan
      </Link>
    </div>
  );
};

export default Plan;