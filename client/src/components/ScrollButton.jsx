import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible); // Cleanup
  }, []);

  return (
    <button
      className="fixed bottom-5 right-0 sm:right-5 z-50 border-none outline-none cursor-pointer rounded-full p-2 backdrop-blur-md bg-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <FaArrowCircleUp
        onClick={scrollToTop}
        className={`text-4xl sm:text-5xl text-yellow-400 hover:text-yellow-500 transition-all duration-300 ${
          visible ? 'block' : 'hidden'
        }`}
      />
    </button>
  );
};

export default ScrollButton;