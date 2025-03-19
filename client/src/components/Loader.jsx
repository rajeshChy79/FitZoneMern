import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Loader = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden flex justify-center items-center w-full">
      <div
        className="backdrop-blur-md bg-white/20 rounded-xl shadow-lg p-4 sm:p-6 text-center"
        data-aos="fade-up"
      >
        <div className="w-12 h-12 rounded-full animate-spin border-4 border-dashed border-yellow-400 border-t-transparent mx-auto mb-4"></div>
        <h3 className="text-lg sm:text-xl md:text-3xl text-white">Loading...</h3>
      </div>

      {/* Custom CSS to hide scrollbar */}
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari, Edge */
          html {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }
          html::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
          }
        `}
      </style>
    </div>
  );
};

export default Loader;