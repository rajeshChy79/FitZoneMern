import React, { useEffect } from 'react';
import { Review, Heading } from "./";
import { review1, review2, review3, review4 } from "../images";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Reviews = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: -100,
      easing: 'ease-in-back',
      once: true,
    });
  }, []);

  const reviews = [
    { img: review1, name: "Kyle" },
    { img: review2, name: "River" },
    { img: review3, name: "Akon" },
    { img: review4, name: "Arnold" },
  ];

  return (
    <section className="bg-black min-h-screen overflow-hidden pt-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div data-aos="zoom-in">
          <Heading name="Our Reviews" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              data-aos="fade-zoom-in"
              data-aos-delay={`${index * 300}`}
            >
              <Review
                img={review.img}
                alt={`review-${index + 1}`}
                name={review.name}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-black opacity-100 pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-yellow-400/20 rounded-full blur-lg transform translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-500/10 rotate-45 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-yellow-500/10 rotate-45 transform translate-x-1/2 translate-y-1/2"></div>
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
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Reviews;