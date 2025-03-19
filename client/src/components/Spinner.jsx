import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Spinner = ({ path = 'login' }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="bg-black min-h-screen overflow-hidden flex justify-center items-center flex-col gap-5">
      <div
        className="backdrop-blur-md bg-white/20 rounded-xl shadow-lg p-4 sm:p-6 text-center"
        data-aos="fade-up"
      >
        <p className="text-center text-base sm:text-lg lowercase font-normal text-white">
          redirecting to you in {count} seconds
        </p>
        <div className="w-12 h-12 rounded-full animate-spin border-4 border-dashed border-yellow-400 border-t-transparent mt-4 mx-auto"></div>
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

export default Spinner;