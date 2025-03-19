import React, { useState, useEffect } from "react";
import { ExerciseCard, SearchInput } from "../components";
import AOS from "aos";
import "aos/dist/aos.css";

const Exercise = () => {
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);

  // Initialize AOS only once
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Search Input Section */}
        <div data-aos="fade-up" className="mb-10">
          <SearchInput setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        </div>

        {/* Exercise Card Section */}
        <div data-aos="fade-up">
          <ExerciseCard exercises={exercises} bodyPart={bodyPart} setExercises={setExercises} />
        </div>
      </div>
    </section>
  );
};

export default Exercise;
