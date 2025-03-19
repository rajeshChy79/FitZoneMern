import React from 'react';

const ExerciseVideos = ({ youtubeVideo = [], name }) => {
  if (!Array.isArray(youtubeVideo) || youtubeVideo.length === 0) {
    return (
      <h1 className='text-4xl flex justify-center items-center w-full h-screen text-center'>
        Loading...
      </h1>
    );
  }

  return (
    <section className='bg-white py-14'>
      <div className="px-7 sm:px-14">
        <h2 className='text-2xl sm:text-3xl md:text-5xl text-black capitalize text-center border-b-4 border-red-500 sm:border-none mb-10'>
          <span className='text-red-400'>{name}</span> Exercise Videos
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {youtubeVideo.slice(0, 6).map((item, index) => (
            <a 
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`} 
              key={index} 
              target="_blank" 
              rel='noreferrer'
              className="group block"
            >
              <img 
                src={item.video.thumbnails[0].url} 
                className='w-full mb-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300' 
                alt={item.video.title} 
                loading="lazy" 
              />
              <h2 className='text-base sm:text-xl font-normal group-hover:text-red-500 transition'>
                {item.video.title.length > 40 ? item.video.title.slice(0, 40) + "..." : item.video.title}
              </h2>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExerciseVideos;
