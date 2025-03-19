import React from 'react';
import { error } from '../images';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-6">
      <div className="text-center">
        <img 
          src={error} 
          className="w-full max-w-lg mx-auto animate-pulse transition-transform duration-500 hover:scale-105" 
          alt="Error 404"
        />
        <h2 className="text-3xl sm:text-4xl font-bold mt-6">Oops! Page Not Found</h2>
        <p className="text-gray-300 mt-2 text-lg">The page you are looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-6 py-2 text-lg font-semibold rounded-md shadow-md"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default Error;
