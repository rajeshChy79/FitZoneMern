import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '../../components';
import { useAuth } from "../../context/auth";
import AOS from 'aos';
import 'aos/dist/aos.css';

const UserDashBoard = () => {
  const { auth } = useAuth();

  // Initialize AOS only once
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Dashboard links
  const dashboardLinks = [
    { path: "/dashboard/user/plan-detail", label: "Plan Detail" },
    { path: "/dashboard/user/favourite-exercises", label: "Favourite Exercises" },
    { path: "/dashboard/user/profile", label: "Profile" },
    { path: "/dashboard/user/feedbacks", label: "Feedbacks" },
  ];

  return (
    <section className="pt-10 bg-gray-900 min-h-screen">
      <Heading name="User Dashboard" />
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="p-6 border border-white rounded-lg text-center transition-all duration-300
                        bg-gray-800 text-white text-2xl font-semibold hover:bg-blue-600 hover:shadow-lg"
              data-aos="fade-up"
              aria-label={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserDashBoard;
