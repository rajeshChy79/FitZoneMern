import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trainerImg1, trainerImg2, trainerImg3, trainerImg4 } from '../images';

const trainers = [
  { id: "1", name: "John", age: 48, address: "San Francisco, USA", phone: "9876543210", description: "Very experienced coach.", image: trainerImg1 },
  { id: "2", name: "Alish", age: 40, address: "Tokyo, Japan", phone: "67854368654", description: "New technique coach.", image: trainerImg2 },
  { id: "3", name: "Rey", age: 33, address: "Iran", phone: "7689756467", description: "Very strict coach.", image: trainerImg3 },
  { id: "4", name: "Akon", age: 35, address: "New Zealand", phone: "75758797759", description: "Focus and discipline.", image: trainerImg4 },
];

const TrainerDetails = () => {
  const { trainerId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const trainer = trainers.find((t) => t.id === trainerId);

  if (!trainer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl text-white font-bold">Trainer Not Found</h2>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-900 text-white">
      <h2 className="text-center text-4xl font-bold mb-8 animate-fade-in">Trainer Detail</h2>
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Trainer Image */}
          <div className="flex justify-center">
            <img
              src={trainer.image}
              alt={`Trainer ${trainer.name}`}
              className="w-full max-w-[80%] rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
          </div>

          {/* Trainer Details */}
          <div className="flex flex-col gap-4 p-6 bg-white text-gray-800 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold">Name: {trainer.name}</p>
            <p className="text-lg">Age: {trainer.age}</p>
            <p className="text-lg">Address: {trainer.address}</p>
            <p className="text-lg">Phone: {trainer.phone}</p>
            <p className="text-lg">Description: {trainer.description}</p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/"
          className="text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-6 py-2 rounded-md shadow-md"
        >
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default TrainerDetails;
