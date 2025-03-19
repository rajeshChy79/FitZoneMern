import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { Input } from "../components";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z]+$/.test(name)) {
      toast.error("Name must contain only alphabets");
      return;
    }

    if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(city)) {
      toast.error("City must contain only alphabets and spaces");
      return;
    }

    const phoneNumberPattern = /^(9|8|7|6)\d{9}$/;
    if (!phoneNumberPattern.test(contact)) {
      toast.error("Phone number must start with 9, 8, 7, or 6 and contain exactly 10 digits");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, { name, password, email, city, contact });
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
    AOS.init({ duration: 1000, easing: 'ease-in-out', offset: 120, once: true });
  }, []);

  return (
    <div className="bg-black min-h-screen flex justify-center items-center px-4">
      <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md" data-aos="fade-up">
        <h2 className="text-center text-3xl sm:text-4xl text-white font-bold">Register</h2>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} minLength="4" maxLength="30" />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-all">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <Input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} minLength="4" maxLength="35" />
          <Input type="text" placeholder="Phone" value={contact} onChange={(e) => setContact(e.target.value)} />
          <Link to="/login" className="text-white text-center opacity-85 font-medium">Already registered? <span className="underline text-yellow-400 font-semibold">Login</span></Link>
          <button type="submit" className="px-5 py-2 font-normal border border-white rounded-md text-xl text-white hover:bg-yellow-400 hover:text-black transition-all w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
