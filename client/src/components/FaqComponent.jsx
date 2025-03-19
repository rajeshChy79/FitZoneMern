import React from "react";

const FaqComponent = ({ question, answer }) => {
  return (
    <details className="bg-gray-800 text-white rounded-md shadow-md mb-4 border border-gray-700 transition-all">
      <summary className="cursor-pointer bg-gray-700 p-4 rounded-t-md text-lg font-semibold transition hover:bg-blue-500">
        {question}
      </summary>
      <div className="p-4 text-gray-300 text-base">
        <p>{answer}</p>
      </div>
    </details>
  );
};

export default FaqComponent;
