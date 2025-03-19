import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading, Subscription, Loader } from '../../components';
import { toast } from 'react-hot-toast';
import { userImg } from '../../images';
import { BASE_URL } from '../../utils/fetchData';

const PlanDetail = () => {
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all user subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/auth/get-all-user-plan`);
        if (res.data?.success) {
          setUserSubscriptions(res.data.subscription);
        } else {
          toast.error("Failed to fetch subscriptions.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching subscriptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <Loader />;
  if (userSubscriptions.length === 0)
    return <h1 className="text-3xl sm:text-5xl text-white flex justify-center items-center h-screen">No Plan Chosen</h1>;

  return (
    <section className="pt-10 bg-gray-900">
      <Heading name="Current User Plan" />
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {userSubscriptions.map((subscription, i) => (
            <Subscription
              key={i}
              userImg={userImg}
              userName={subscription.userName}
              planName={subscription.plan.planName}
              planAmount={subscription.planAmount}
              planType={subscription.planType}
              createdAt={subscription.createdAt}
              planid={subscription.plan._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanDetail;
