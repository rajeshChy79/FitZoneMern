import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { exerciseOptions, fetchData } from '../utils/fetchData';
import BodyPart from './BodyPart';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SearchInput = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: -100,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchBodypartsData = async () => {
      const bodypartsData = await fetchData("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exerciseOptions);
      setBodyParts(["all", ...bodypartsData]);
    };
    fetchBodypartsData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", exerciseOptions);
      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      setSearch('');
      setExercises(searchedExercises);
      window.scrollTo({ top: 1500, left: 100, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black min-h-screen overflow-hidden pt-20 sm:pt-32">
      <div className="px-4 sm:px-7 md:px-14 space-y-10 sm:space-y-12">
        <h2
          className="text-xl sm:text-3xl md:text-5xl text-white capitalize text-center border-b-4 border-yellow-400 sm:border-none"
          data-aos="fade-up"
        >
          awesome exercise you <br className="block sm:hidden" /> should know
        </h2>
        <div
          className="flex flex-row justify-center items-center backdrop-blur-md bg-white/20 rounded-lg shadow-lg p-2 sm:p-4 w-full max-w-4xl mx-auto"
          data-aos="zoom-in"
        >
          <input
            type="text"
            placeholder="Search"
            className="outline-none px-4 sm:px-6 py-2 text-lg sm:text-2xl text-gray-300 w-full bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <button
            className="text-2xl md:text-4xl px-4 sm:px-5 text-white bg-yellow-400 py-2 sm:py-[7px] rounded hover:bg-yellow-500 transition-all duration-300"
            onClick={handleSearch}
          >
            <AiOutlineSearch />
          </button>
        </div>
        <div data-aos="fade-up">
          <BodyPart bodyParts={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} setExercises={setExercises} />
        </div>
      </div>

      {/* Custom CSS to hide scrollbar */}
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari, Edge */
          html {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }
          html::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
          }
        `}
      </style>
    </section>
  );
};

export default SearchInput;