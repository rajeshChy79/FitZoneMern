import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { Input } from "../components";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
      offset: 200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 flex justify-center items-center">
        <form
          className="backdrop-blur-md bg-white/20 rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md flex flex-col gap-5"
          onSubmit={onSubmit}
          data-aos="fade-up"
        >
          <h2 className="text-center text-3xl sm:text-4xl text-white font-bold">Login</h2>

          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            data-aos="zoom-in"
          />

          <div className="relative" data-aos="zoom-in">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-all"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Link
            to="/forgot-password"
            className="text-white opacity-85 font-medium text-center"
            data-aos="fade-in"
          >
            forgot password?{' '}
            <span className="underline text-yellow-400 font-semibold">Reset Password</span>
          </Link>

          <button
            type="submit"
            className="px-5 py-2 font-normal border border-white rounded-md text-xl text-white hover:bg-yellow-400 hover:text-black transition-all ease-in-out w-full max-w-[750px] self-center"
            data-aos="slide-up"
          >
            Submit
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
    </div>
  );
};

export default Login;