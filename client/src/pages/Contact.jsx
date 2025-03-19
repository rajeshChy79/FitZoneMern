import React, { useState, useEffect, useCallback } from "react";
import { Heading, Input, TextArea } from "../components";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/fetchData";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      offset: 200,
      once: true,
    });
  }, []);

  // Handle input change dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = useCallback(() => {
    const { name, email, city, phone, message } = formData;

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name must contain only alphabets");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(city)) {
      toast.error("City must contain only alphabets and spaces");
      return false;
    }

    const phonePattern = /^(9|8|7|6)\d{9}$/;
    if (!phonePattern.test(phone)) {
      toast.error(
        "Phone number must start with 9, 8, 7, or 6 and contain exactly 10 digits"
      );
      return false;
    }

    if (message.length < 10) {
      toast.error("Message must be at least 10 characters long");
      return false;
    }

    return true;
  }, [formData]);

  const createQuery = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/contact/create-contact`, formData);
      
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success(data.message);
        setFormData({ name: "", email: "", city: "", phone: "", message: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-900 to-black text-white">
      <Heading name="Contact Us" />

      <div className="container py-10">
        <form
          className="flex flex-col gap-8 justify-center items-center w-full max-w-3xl mx-auto"
          onSubmit={createQuery}
        >
          {/* Name Input */}
          <div data-aos="fade-up" className="w-full">
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Input */}
          <div data-aos="fade-up" className="w-full" data-aos-delay="100">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* City Input */}
          <div data-aos="fade-up" className="w-full" data-aos-delay="200">
            <Input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {/* Phone Input */}
          <div data-aos="fade-up" className="w-full" data-aos-delay="300">
            <Input
              type="text"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Message Input */}
          <div data-aos="fade-up" className="w-full" data-aos-delay="400">
            <TextArea
              value={formData.message}
              name="message"
              placeholder="Write Your Message"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div data-aos="zoom-in" className="w-full" data-aos-delay="500">
            <button
              className="w-full border-2 px-5 py-3 text-white border-white text-center text-xl font-medium 
              hover:bg-white transition-all duration-300 ease-in hover:text-black rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
