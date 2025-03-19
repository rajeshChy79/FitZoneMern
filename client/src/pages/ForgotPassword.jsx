import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { Input } from "../components";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const submitPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      offset: 120,
      once: true,
    });
  }, []);

  return (
    <section className="bg-black min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 flex justify-center items-center">
        <form
          className="backdrop-blur-md bg-white/20 rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md flex flex-col gap-4 items-center justify-center"
          onSubmit={submitPassword}
          data-aos="fade-up"
        >
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-white" data-aos="zoom-in">
            RESET PASSWORD
          </h2>

          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            data-aos="fade-up"
          />

          <div className="relative w-full" data-aos="fade-up">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              name="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-all"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            className="px-5 py-2 font-normal border border-white rounded-md text-xl text-white hover:bg-yellow-400 hover:text-black transition-all ease-in-out w-full max-w-[750px]"
            type="submit"
            data-aos="slide-up"
          >
            Reset
          </button>
        </form>
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
    </section>
  );
};

export default ForgotPassword;