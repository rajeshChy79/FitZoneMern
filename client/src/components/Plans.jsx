import React, { useState, useEffect } from 'react';
import { Heading } from ".";
import { planImg1, planImg2, planImg3, planImg4 } from '../images';
import { Plan } from '.';
import axios from 'axios';
import { BASE_URL } from '../utils/fetchData';
import Loader from './Loader';
import { toast } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: -200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const getAllPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/plan/getall-plan`);
      if (res.data && res.data.success) {
        setPlans(res.data.plans);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting plans");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-black min-h-screen overflow-hidden pt-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div data-aos="zoom-in">
          <Heading name="Trending Plans" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {plans.map((p, i) => (
            <div key={p._id} data-aos="zoom-in" data-aos-delay={i * 100}>
              <Plan
                img={i === 0 ? planImg1 : i === 1 ? planImg2 : i === 2 ? planImg3 : planImg4}
                alt={`plan-img-${i}`}
                name={p.planName}
                id={p._id}
                monthlyPrice={p.monthlyPlanAmount}
                yearlyPrice={p.yearlyPlanAmount}
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

export default Plans;