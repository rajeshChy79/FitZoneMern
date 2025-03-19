import React from "react";
import { aboutImg } from "../images";
import { Heading, ButtonOutline } from "../components";

const About = () => {
  return (
    <section className="pt-36 pb-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <Heading name="About Us" />

      <div className="container pt-16 mx-auto px-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-6" data-aos="fade-right">
            <h3 className="text-3xl font-bold text-blue-400">Mark Your Attendance</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem dolorum officia neque unde, 
              dolores perspiciatis omnis beatae vitae blanditiis id. Lorem ipsum dolor sit amet consectetur, 
              adipisicing elit. Esse nostrum fugit iste maxime non suscipit.
            </p>

            <ButtonOutline text="Explore More" />
          </div>

          {/* Right Image */}
          <div data-aos="fade-left">
            <img 
              src={aboutImg} 
              alt="about-img" 
              className="w-full max-w-md mx-auto md:max-w-lg object-cover rounded-lg shadow-lg transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
