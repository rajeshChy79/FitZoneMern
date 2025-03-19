import React, { useEffect } from 'react';
import Heading from './Heading';
import { Trainer } from ".";
import { trainerImg1, trainerImg2, trainerImg3, trainerImg4 } from "../images";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Trainers = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      offset: -200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const trainers = [
    { img: trainerImg1, alt: "trainer-1", id: "1", name: "John", age: "48" },
    { img: trainerImg2, alt: "trainer-2", id: "2", name: "Alish", age: "40" },
    { img: trainerImg3, alt: "trainer-3", id: "3", name: "Rey", age: "33" },
    { img: trainerImg4, alt: "trainer-4", id: "4", name: "Akon", age: "35" },
  ];

  return (
    <section className="bg-black min-h-screen overflow-hidden pt-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div data-aos="zoom-in">
          <Heading name="Our Trainers" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={trainer.id}
              data-aos="fade-up"
              data-aos-delay={`${index * 300}`}
            >
              <Trainer
                img={trainer.img}
                alt={trainer.alt}
                id={trainer.id}
                name={trainer.name}
                age={trainer.age}
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

export default Trainers;