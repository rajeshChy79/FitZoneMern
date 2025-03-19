import React, { useEffect, useCallback } from "react";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import { exercisePng } from "../images";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

const BodyPart = ({ bodyParts, setBodyPart, bodyPart, setExercises }) => {
  // Optimize API call using useCallback
  const fetchExercisesData = useCallback(async () => {
    let exercisesData = [];
    if (bodyPart === "all") {
      exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );
    } else {
      exercisesData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
        exerciseOptions
      );
    }
    setExercises(exercisesData);
  }, [bodyPart, setExercises]);

  useEffect(() => {
    fetchExercisesData();
  }, [fetchExercisesData]);

  return (
    <section className="py-10">
      <div className="overflow-hidden">
        <h2 className="text-3xl md:text-5xl text-white capitalize text-center border-b-4 border-red-500 mb-10">
          Exercise Categories
        </h2>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          centeredSlides
          centeredSlidesBounds
          className="my-5"
        >
          {bodyParts.map((exercise, id) => (
            <SwiperSlide
              key={id}
              style={{ maxWidth: "160px", height: "auto", overflow: "hidden" }}
              className="shadow-lg animate-slideright cursor-pointer hover:opacity-80 transition-all rounded-lg"
            >
              <div
                className="bg-white rounded-lg hover:bg-gray-200 transition text-center cursor-pointer border-t-2 border-rose-500"
                onClick={() => {
                  setBodyPart(exercise);
                  window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
                }}
              >
                <img
                  src={exercisePng}
                  alt="exercise-type"
                  className="w-full mx-auto hover:scale-110 transition-all duration-300"
                />
                <h2 className="text-lg border-b-2 border-green-500 hover:opacity-80 text-black p-2">
                  {exercise}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BodyPart;
