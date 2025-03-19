import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from "../components";
import { useAuth } from '../context/auth';
import { BASE_URL } from '../utils/fetchData';

const Profile = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  // Consolidated state into a single object
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    city: "",
    contact: ""
  });

  // Load user data into state when component mounts
  useEffect(() => {
    if (auth?.user) {
      setUserData({
        name: auth.user.name || "",
        email: auth.user.email || "",
        city: auth.user.city || "",
        contact: auth.user.contact || ""
      });
    }
  }, [auth]);

  // Generic handler for input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Validation Function
  const validateInput = () => {
    const { name, city, contact } = userData;

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name must contain only alphabets and spaces");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(city)) {
      toast.error("City must contain only alphabets and spaces");
      return false;
    }

    const phoneNumberPattern = /^(9|8|7|6)\d{9}$/;
    if (!phoneNumberPattern.test(contact)) {
      toast.error("Phone number must start with 9, 8, 7, or 6 and contain exactly 10 digits");
      return false;
    }

    return true;
  };

  // Update User Profile
  const updateUser = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    try {
      const { data } = await axios.put(`${BASE_URL}/api/v1/auth/user-profile`, userData);
      
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      // Update auth state and local storage
      setAuth({ ...auth, user: data.updatedUser });
      localStorage.setItem("auth", JSON.stringify({ ...auth, user: data.updatedUser }));

      toast.success("Profile updated successfully!");
      navigate("/");
      
    } catch (error) {
      toast.error("Something went wrong while updating profile");
    }
  };

  return (
    <section className='bg-gray-900 min-h-screen flex items-center justify-center'>
      <div className='container mx-auto px-6 max-w-lg'>
        <form className='flex flex-col gap-5 bg-gray-800 p-8 rounded-lg shadow-md' onSubmit={updateUser}>
          <h2 className='text-center text-3xl text-white font-bold mb-4'>Profile</h2>

          <Input 
            type="text"
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            minLength="4"
            maxLength="30"
          />

          <Input 
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            disabled // Email is not editable
          />

          <Input 
            type="text"
            placeholder="City"
            name="city"
            value={userData.city}
            onChange={handleChange}
            minLength="4"
            maxLength="35"
          />

          <Input 
            type="text"
            placeholder="Phone"
            name="contact"
            value={userData.contact}
            onChange={handleChange}
          />

          <button 
            type='submit' 
            className='btn px-5 py-2 font-normal border border-white rounded-md text-xl text-white hover:text-black hover:bg-white transition-all w-full'
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
