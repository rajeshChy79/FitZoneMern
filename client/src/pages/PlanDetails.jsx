import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ButtonOutline, Loader } from '../components';
import { useAuth } from '../context/auth';
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PlanDetails = () => {
  const { auth } = useAuth();
  const { planid } = useParams();
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState({});

  useEffect(() => {
    const getSinglePlan = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/v1/plan/get-plan/${planid}`);
        if (res.data && res.data.success) {
          setPlanData(res.data.plan);
        }
        setLoading(false);
      } catch (err) {
        toast.error("Error fetching plan details");
        setLoading(false);
      }
    };

    getSinglePlan();
    AOS.init({ duration: 1000 });
  }, [planid]);

  if (loading) return <Loader />;

  const planFeatures = [
    { label: "Water Stations", value: planData.waterStations },
    { label: "Locker Rooms", value: planData.lockerRooms },
    { label: "Special Events", value: planData.specialEvents },
    { label: "Wifi Service", value: planData.wifiService },
    { label: "Cardio Class", value: planData.cardioClass },
    { label: "Café or Lounge", value: planData.cafeOrLounge },
    { label: "Personal Trainer", value: planData.personalTrainer },
    { label: "Group Fitness Classes", value: planData.groupFitnessClasses },
    { label: "Refreshment", value: planData.refreshment },
  ];

  return (
    <section className='py-20 flex flex-col justify-center items-center bg-gray-900'>
      <h2 className='text-white text-3xl sm:text-4xl font-bold text-center mb-6' data-aos="fade-up">
        What's Included in This Plan?
      </h2>
      <div className="container mx-auto px-6 py-4">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-10'>
          {planFeatures.map((item, index) => (
            <div 
              key={index} 
              className='flex items-center justify-center gap-3 p-4 bg-gray-800 rounded-lg shadow-lg' 
              data-aos="zoom-in"
            >
              <ButtonOutline text={item.label} />
              {item.value === "Available" ? (
                <TiTick className='text-green-500 text-4xl' />
              ) : (
                <IoClose className='text-red-600 text-4xl' />
              )}
            </div>
          ))}
        </div>
      </div>
      <Link
        to={auth.user ? `/plan-subscribe/${planid}` : "/login"}
        className='mt-8 bg-blue-500 text-white font-medium text-lg rounded-md hover:opacity-90 transition-all px-8 py-3 shadow-lg'
        data-aos="fade-up"
      >
        Buy Now
      </Link>
    </section>
  );
}

export default PlanDetails;
