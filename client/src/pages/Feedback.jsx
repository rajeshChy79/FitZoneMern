import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth"; 
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/fetchData";

const Feedback = () => {
  const [formData, setFormData] = useState({
    message: "",
    rating: 1,
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { auth } = useAuth();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth?.user) {
      toast.error("Please log in to submit feedback.");
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Feedback message must be at least 10 characters long.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/v1/feedback/create-feedback`, formData);
      setFeedbackSubmitted(true);
      toast.success("Feedback submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting feedback. Please try again.");
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-gray-800">Thank You for Your Feedback!</h2>
          <p className="text-gray-600">Your feedback has been submitted successfully.</p>
          <Link className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" to="/">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Submit Feedback</h2>

        {/* Message Input */}
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* Rating Selection */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-semibold mb-2">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 transition-all"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
