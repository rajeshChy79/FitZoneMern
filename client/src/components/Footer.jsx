import React from "react";
import { sponsorImg1, sponsorImg2, sponsorImg3, sponsorImg4 } from "../images";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"; // Social Icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-10 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Explore More Section */}
          <div className="flex flex-col gap-4" data-aos="fade-right">
            <h2 className="text-2xl font-bold text-blue-400">Explore More</h2>
            <p className="text-gray-400 font-medium text-base leading-relaxed">
              Discover the best in fitness, wellness, and lifestyle content. Stay updated with the latest trends, offers, and more.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col gap-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-blue-400">Subscribe to Our Newsletter</h2>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                className="w-full px-4 py-3 text-gray-900 font-medium border-none outline-none rounded-md 
                placeholder-gray-600 transition-all focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-400 text-black font-semibold 
                rounded-md transition-all ease-in-out hover:bg-blue-500 hover:scale-105">
                Submit
              </button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col gap-4" data-aos="fade-left">
            <h2 className="text-2xl font-bold text-blue-400">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all text-2xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all text-2xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all text-2xl">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Sponsor Logos */}
          <div className="flex flex-col gap-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-blue-400">Our Sponsors</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <img src={sponsorImg1} alt="Sponsor 1" className="w-24 h-auto object-contain mx-auto" />
              <img src={sponsorImg2} alt="Sponsor 2" className="w-24 h-auto object-contain mx-auto" />
              <img src={sponsorImg3} alt="Sponsor 3" className="w-24 h-auto object-contain mx-auto" />
              <img src={sponsorImg4} alt="Sponsor 4" className="w-24 h-auto object-contain mx-auto" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400">© 2024 GymMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
