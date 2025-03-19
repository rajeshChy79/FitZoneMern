import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Heading, Loader } from '../../components';
import { BASE_URL } from '../../utils/fetchData';

const Feedbacks = () => {
  const { auth } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [editedRating, setEditedRating] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all feedbacks
  useEffect(() => {
    const getAllUserFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/v1/auth/get-all-user-feedback`);
        if (res.data?.success) {
          setFeedbacks(res.data.newFeedback);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch feedback.");
        setLoading(false);
      }
    };
    getAllUserFeedbacks();
  }, []);

  // Edit feedback
  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback);
    setEditedMessage(feedback.message);
    setEditedRating(feedback.rating);
  };

  // Update feedback
  const handleUpdateFeedback = async (feedbackId) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/feedback/update-feedback/${feedbackId}`, {
        message: editedMessage,
        rating: editedRating,
      });
      setEditingFeedback(null);
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map(f => (f._id === response.data.updatedFeedback._id ? response.data.updatedFeedback : f))
      );
    } catch (err) {
      console.error('Error updating feedback:', err);
      setError('Error updating feedback. Please try again.');
    }
  };

  // Delete feedback
  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/feedback/delete-feedback/${feedbackId}`);
      setFeedbacks(prevFeedbacks => prevFeedbacks.filter(f => f._id !== feedbackId));
    } catch (err) {
      console.error('Error deleting feedback:', err);
      setError('Error deleting feedback. Please try again.');
    }
  };

  if (!auth.user) {
    return (
      <section className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p className="text-2xl font-semibold">Please log in to view your feedback.</p>
      </section>
    );
  }

  if (loading) return <Loader />;

  return (
    <section className="bg-gray-900 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">
        <Heading name="Your Feedback" />
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        
        {feedbacks.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <p className="text-white text-3xl text-center">No feedback submitted yet.</p>
          </div>
        ) : (
          <ul className="space-y-6 mt-10">
            {feedbacks.map((feedback) => (
              <li key={feedback._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                {editingFeedback?._id === feedback._id ? (
                  <div className="space-y-4">
                    <textarea
                      className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                      rows="4"
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      required
                    />
                    <select
                      className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                      value={editedRating}
                      onChange={(e) => setEditedRating(e.target.value)}
                      required
                    >
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => handleUpdateFeedback(feedback._id)}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setEditingFeedback(null)}
                        className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xl font-semibold">Name: <b>{feedback.user.name}</b></p>
                    <p className="text-lg">Message: {feedback.message}</p>
                    <p className="text-lg">Rating: <b>{feedback.rating}</b></p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => handleEditFeedback(feedback)}
                        className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFeedback(feedback._id)}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Feedbacks;
