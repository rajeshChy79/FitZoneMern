import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ButtonOutline, Loader } from '../../components';
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { BASE_URL } from '../../utils/fetchData';

const PlanFullDetail = () => {
  const { planid } = useParams();
  const [planDetails, setPlanDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch plan details
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/plan/get-plan/${planid}`);
        if (res.data?.success) {
          setPlanDetails(res.data.plan);
        } else {
          toast.error("Failed to fetch plan details.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching the plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [planid]);

  if (loading) return <Loader />;

  // Feature list for better mapping
  const features = [
    { label: "Water Stations", value: planDetails.waterStations },
    { label: "Locker Rooms", value: planDetails.lockerRooms },
    { label: "Special Events", value: planDetails.specialEvents },
    { label: "Wifi Service", value: planDetails.wifiService },
    { label: "Cardio Class", value: planDetails.cardioClass },
    { label: "Café or Lounge", value: planDetails.cafeOrLounge },
    { label: "Personal Trainer", value: planDetails.personalTrainer },
    { label: "Group Fitness Classes", value: planDetails.groupFitnessClasses },
    { label: "Refreshment", value: planDetails.refreshment },
  ];

  return (
    <section className="py-20 flex flex-col justify-center items-center bg-gray-900">
      <h2 className="text-white text-3xl sm:text-4xl text-center mb-4">
        You Have Chosen <span className="font-bold text-blue-400">{planDetails.planName}</span> Plan
      </h2>
      <p className="text-gray-300 text-lg text-center mb-10">
        The Features of the Pack Are Shown Below:
      </p>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 justify-center items-center bg-gray-800 p-4 rounded-md shadow-md">
              <ButtonOutline text={feature.label} />
              {feature.value === "Available" ? (
                <TiTick className="text-green-500 text-3xl" />
              ) : (
                <IoClose className="text-red-600 text-3xl" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/dashboard/user"
        className="mt-10 bg-blue-500 text-white font-medium text-lg rounded-md hover:opacity-90 transition-all px-6 py-2 shadow-md"
      >
        Go Back
      </Link>
    </section>
  );
};

export default PlanFullDetail;
