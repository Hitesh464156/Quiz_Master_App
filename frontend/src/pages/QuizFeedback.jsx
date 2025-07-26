import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useAppContext } from "../context/ContextProvider";
import DropdownMenu from "../components/miscellaneous/DropdownMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from ".././config";

const QuizFeedback = () => {
  const { id } = useParams();
  const { user, darkMode } = useAppContext();
  const navigate = useNavigate();

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Quiz ID from URL params:", id);
  console.log("User from context:", user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);
    console.log("Submitting feedback with:", { rating, message });

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${config.backendURL}/api/v1/quiz/feedback/${id}`,
        { rating, message },
        axiosConfig
      );

      console.log("Feedback response data:", data);

      toast.success(data.message);
      setTimeout(() => {
        console.log("Navigating to quiz result page...");
        navigate(`/quiz-result/${id}`, { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-white">
      <div className="w-[90%] max-w-4xl mt-5 py-6 px-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-950 flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
          Feedback
        </h1>
        <DropdownMenu />
      </div>

      <div className="w-[90%] max-w-4xl min-h-[600px] mb-5 p-16 max-sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-950 flex flex-col items-center justify-center text-gray-700 dark:text-gray-200">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center"
        >
          <div className="flex items-center space-x-1 mb-8">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    className="hidden"
                    onClick={() => {
                      console.log("Selected rating:", ratingValue);
                      setRating(ratingValue);
                    }}
                  />
                  <FaStar
                    size={40}
                    className="cursor-pointer transition-transform transform hover:scale-110"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>

          <textarea
            className="w-full h-32 p-4 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 mb-4"
            placeholder="Write your feedback here..."
            value={message}
            onChange={(e) => {
              console.log("Updated message:", e.target.value);
              setMessage(e.target.value);
            }}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-24 h-12 ${
              loading
                ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 dark:bg-blue-400 hover:bg-blue-700 dark:hover:bg-blue-300 text-white dark:text-gray-900"
            } text-lg font-medium rounded-lg shadow dark:shadow-gray-800 transition-transform transform hover:scale-105`}
          >
            {loading ? (
              <ImSpinner2
                size={22}
                className="mx-auto animate-spin dark:text-white"
              />
            ) : (
              "Submit"
            )}
          </button>

          <ToastContainer
            position="top-right"
            theme={darkMode ? "dark" : "light"}
          />
        </form>
      </div>
    </div>
  );
};

export default QuizFeedback;
