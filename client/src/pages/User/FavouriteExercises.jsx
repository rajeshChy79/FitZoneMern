import React from 'react';
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate, Link } from 'react-router-dom';

const FavouriteExercises = () => {
  const { cart, setCart } = useCart();

  // Remove exercise from favorites
  const removeExercise = (Eid) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== Eid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.alert("Selected exercise removed from favorites.");
    } catch (error) {
      console.log(error);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="flex justify-center items-center h-screen bg-gray-900">
        <h1 className="text-3xl sm:text-5xl text-white font-semibold">No Favourite Exercises</h1>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-900">
      <h2 className="text-3xl md:text-4xl text-white font-semibold text-center">
        You Have <span className="text-red-500">{cart.length}</span> Favourite Exercises
      </h2>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((exercise) => (
            <div key={exercise.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all">
              <Link to={`/exercise/${exercise.id}`} className="block">
                <img 
                  src={exercise.gifUrl} 
                  className="w-full h-40 object-contain mx-auto rounded-md transition-transform duration-300 hover:scale-105" 
                  alt={exercise.name} 
                  loading="lazy"
                />
                <div className="flex gap-2 justify-center mt-4">
                  <span className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md">{exercise?.bodyPart}</span>
                  <span className="px-3 py-1 text-sm bg-red-500 text-white rounded-md">{exercise?.target}</span>
                </div>
                <h3 className="text-lg font-semibold text-center mt-3 capitalize">{exercise?.name}</h3>
              </Link>

              <button 
                type="button" 
                className="w-full mt-4 bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600 transition-all"
                onClick={() => removeExercise(exercise.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FavouriteExercises;
