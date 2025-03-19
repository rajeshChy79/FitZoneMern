import React from "react";

const ContactComponent = ({ userImg, name, email, phone, message, city, i }) => {
  return (
    <div
      key={i}
      className="flex flex-col gap-6 justify-center items-center border border-gray-300 rounded-lg p-6 
      transition-all duration-300 group shadow-lg hover:shadow-2xl hover:bg-gray-50 w-full max-w-lg mx-auto"
    >
      {/* User Name */}
      <h3 className="text-blue-600 font-bold text-center text-2xl group-hover:text-blue-800 transition-all">
        {name}
      </h3>

      {/* Profile Image */}
      <img
        src={userImg}
        alt="User"
        loading="lazy"
        className="w-24 h-24 object-cover rounded-full border-4 border-gray-300 group-hover:scale-110 transition-transform duration-300"
      />

      {/* Contact Details */}
      <div className="flex flex-col gap-4 w-full">
        <p className="text-gray-700 text-md bg-blue-100 rounded-lg p-3">
          <span className="font-semibold text-blue-600">Email: </span>
          {email}
        </p>
        <p className="text-gray-700 text-md bg-green-100 rounded-lg p-3">
          <span className="font-semibold text-green-600">Phone: </span>
          {phone}
        </p>
        <p className="text-gray-700 text-md bg-purple-100 rounded-lg p-3">
          <span className="font-semibold text-purple-600">City: </span>
          {city}
        </p>
        <p className="text-gray-700 text-md bg-yellow-100 rounded-lg p-3 break-words">
          <span className="font-semibold text-yellow-600">Message: </span>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ContactComponent;
