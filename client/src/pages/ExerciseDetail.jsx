import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { GiGymBag } from "react-icons/gi";
import { fetchData, exerciseOptions, youtubeExerciseOptions } from "../utils/fetchData";
import { ExerciseCard, ExerciseVideos } from "../components";
import AOS from "aos";
import "aos/dist/aos.css";

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState({});
  const [youtubeVideo, setYoutubeVideo] = useState([]);
  const [targetMuscle, setTargetMuscle] = useState([]);
  const [equipmentExercise, setEquipmentExercise] = useState([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", offset: 120, once: true });
  }, []);

  // Optimized API Fetching
  const fetchExerciseData = useCallback(async () => {
    try {
      const particularExerciseData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExercises(particularExerciseData);

      const youtubeExerciseVideoData = await fetchData(
        `https://youtube-search-and-download.p.rapidapi.com/search?query=${particularExerciseData.name}`,
        youtubeExerciseOptions
      );
      setYoutubeVideo(youtubeExerciseVideoData.contents);

      const targetMuscleData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/target/${particularExerciseData.target}`,
        exerciseOptions
      );
      setTargetMuscle(targetMuscleData);

      const equipmentExerciseData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/equipment/${particularExerciseData.equipment}`,
        exerciseOptions
      );
      setEquipmentExercise(equipmentExerciseData);
    } catch (error) {
      console.error("Error fetching exercise data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchExerciseData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [fetchExerciseData]);

  if (!exercises.name) {
    return (
      <h1 className="text-4xl flex justify-center items-center w-full h-screen text-center">
        Loading...
      </h1>
    );
  }

  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-7 sm:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Exercise Image */}
          <div className="bg-white rounded-md overflow-hidden shadow-lg" data-aos="fade-up">
            <img
              src={exercises.gifUrl}
              className="w-full object-cover rounded-md"
              alt={exercises.name}
              loading="lazy"
            />
          </div>

          {/* Exercise Details */}
          <div className="flex flex-col gap-6 justify-center" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold capitalize">{exercises.name}</h2>
            <p className="text-lg text-gray-300">
              Exercises keep you strong. <span className="capitalize">{exercises.name}</span> is one
              of the best exercises to target your{" "}
              <span className="text-blue-400">{exercises.target}</span>. It will help you improve
              your mood and energy.
            </p>

            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex flex-col items-center">
                <GiGymBag className="rounded-full bg-orange-500 text-6xl p-3 hover:bg-orange-600 text-white transition-all" />
                <span className="capitalize text-lg mt-2">{exercises.equipment}</span>
              </div>
              <div className="flex flex-col items-center">
                <GiGymBag className="rounded-full bg-orange-500 text-6xl p-3 hover:bg-orange-600 text-white transition-all" />
                <span className="capitalize text-lg mt-2">{exercises.target}</span>
              </div>
              <div className="flex flex-col items-center">
                <GiGymBag className="rounded-full bg-orange-500 text-6xl p-3 hover:bg-orange-600 text-white transition-all" />
                <span className="capitalize text-lg mt-2">{exercises.bodyPart}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Videos */}
      <div className="mt-20" data-aos="fade-up">
        <ExerciseVideos youtubeVideo={youtubeVideo} name="Related Exercises" />
      </div>

      {/* Target Muscle Section */}
      <div className="mt-20" data-aos="fade-up">
        <ExerciseCard exercises={targetMuscle} heading="Target Muscle" />
      </div>

      {/* Equipment Muscle Section */}
      <div className="mt-20" data-aos="fade-up">
        <ExerciseCard exercises={equipmentExercise} heading="Equipment Muscle" />
      </div>
    </section>
  );
};

export default ExerciseDetail;
