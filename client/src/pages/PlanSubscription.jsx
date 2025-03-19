import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Input, ButtonOutline, Loader } from '../components';
import { useAuth } from '../context/auth';
import { BASE_URL } from '../utils/fetchData';

const PlanSelection = () => {
  const { planid } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState({});
  const [planType, setPlanType] = useState("");
  const [planAmount, setPlanAmount] = useState(0);

  useEffect(() => {
    const fetchPlan = async () => {
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

    fetchPlan();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [planid]);

  const handleDurationChange = (selectedPlanType) => {
    setPlanType(selectedPlanType);
    setPlanAmount(selectedPlanType === "1 Year" ? planData.yearlyPlanAmount : planData.monthlyPlanAmount * parseInt(selectedPlanType));
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/subscription/create-subscription`, {
        userName: auth.user.name,
        planType,
        planAmount,
        planId: planid,
      });

      if (res.data?.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Subscription failed");
      }
    } catch (error) {
      toast.error("Something went wrong while creating subscription");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className='bg-gray-900 min-h-screen flex justify-center items-center'>
      <div className='container mx-auto px-6'>
        <form className='flex flex-col items-center gap-6' onSubmit={handleSubscription}>
          <h2 className='text-center text-4xl text-white font-bold'>Choose Plan</h2>

          <Input type="text" placeholder="User Name" value={auth.user?.name} disabled />
          <Input type="text" placeholder="Plan Name" value={planData.planName} disabled />

          <select 
          className="w-[750px] px-4 py-2 rounded-md bg-white font-medium"
          value={planType} 
          onChange={(e) => handleDurationChange(e.target.value)}
        >
          <option value="">Select Duration</option>
          {[...Array(11).keys()].map(i => (
            <option key={i} value={`${i + 1} Month`}>{i + 1} Month</option>
          ))}
          <option value="1 Year">1 Year</option>
        </select>
        

          <Input type="text" placeholder="Plan Amount" value={planAmount} disabled />

          <button 
          type='submit' 
          className="w-[750px] px-5 py-2 font-normal border border-white rounded-md text-xl text-white hover:text-black hover:bg-white transition-all"
        >
          Subscribe
        </button>
        </form>
      </div>
    </section>
  );
}

export default PlanSelection;
