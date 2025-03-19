import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const ExerciseCard = ({ exercises = [], heading }) => {
  const { cart, setCart } = useCart();

  if (!Array.isArray(exercises) || exercises.length === 0) {
    return (
      <h1 className='text-4xl flex justify-center items-center w-full h-screen text-center'>
        No Exercises Found...
      </h1>
    );
  }

  const handleAddToCart = (exercise) => {
    setCart(prevCart => {
      const isExerciseInCart = prevCart.some(item => item.id === exercise.id);
      if (!isExerciseInCart) {
        const updatedCart = [...prevCart, exercise];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Exercise added to Favourites");
        return updatedCart;
      } else {
        toast.error("Exercise is already in the Favourites");
        return prevCart;
      }
    });
  };

  return (
    <section className='pt-32 bg-white' id='exercises'>
      <div className="px-7 sm:px-14">
        <h2 className='text-2xl sm:text-3xl md:text-5xl text-black capitalize text-center border-b-4 border-red-500 sm:border-none mb-10'>
          {heading ? `Similar ${heading} Exercises` : 'Showing Results'}
        </h2>

        <div className="grid gap-4 md:gap-5 grid-cols-2 lg:grid-cols-3">
          {exercises.slice(0, 21).map((exercise, index) => (
            <div key={index} className='flex flex-col items-center gap-4 border-2 p-4 rounded-lg shadow-md'>
              <Link to={exercise.id ? `${exercise.id}` : ""} className='no-underline w-full'>
                <div className="overflow-hidden bg-white">
                  <img 
                    src={exercise.gifUrl} 
                    className='w-[80%] mx-auto hover:scale-105 transition-transform duration-300' 
                    alt={exercise.name} 
                    loading="lazy" 
                  />
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <button className='px-3 py-1 text-white bg-[#240b36] rounded-md'>{exercise.bodyPart}</button>
                    <button className='px-3 py-1 text-white bg-[#c31432] rounded-md'>{exercise.target}</button>
                  </div>
                  <h2 className='text-lg font-bold text-center capitalize mt-3'>{exercise.name}</h2>
                </div>
              </Link>
              <button 
                type="button" 
                className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition"
                onClick={() => handleAddToCart(exercise)}
              >
                Add To Favourites
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExerciseCard;
