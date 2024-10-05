"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AnswerModal from "@/components/modals/AnswerModal"; // Assuming you have this modal component for answering questions
import { useRouter } from "next/navigation";

const QuestionsPage = ({ params, loginInfo }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.user.token}`,
    },
  };

  // Fetch questions from the API
  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/question/product/${params.id}/questions`,
        config
      );

      // Log response to inspect structure
      console.log("Data",response.data);

      // Check if the data is nested or directly available, adjust accordingly
      // Assuming the questions are in response.data.data
      setQuestions(response.data);
    } catch (error) {
      toast.error("Error fetching questions!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [params, loginInfo?.user.token]);

  // Open the modal to answer a question
  const handleOpenModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  // Close the answer modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  // Submit the answer for the selected question
  const handleSubmitAnswer = async (answer) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/question/question/${selectedQuestion._id}/answer`,
        { answer },
        config
      );
      toast.success("Answer submitted successfully!");
      handleCloseModal();
      fetchQuestions(); // Refetch the questions after submitting the answer
    } catch (error) {
      toast.error("Error submitting answer!");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Product Questions</h1>
      {isLoading ? (
        <div className="flex justify-center">Loading...</div>
      ) : questions.length > 0 ? ( // Check if questions exist
        <div className="grid grid-cols-1 gap-4">
          {questions.map((question) => (
            <div key={question._id} className="p-4 bg-white shadow rounded-md">
              <h2 className="text-lg font-semibold">{question.question}</h2>
              <p className="text-gray-600">
                Status:{" "}
                {question.answer ? (
                  <span className="text-green-500">Answered</span>
                ) : (
                  <span className="text-red-500">Not Answered</span>
                )}
              </p>
              {!question.answer && (
                <button
                  className="mt-2 bg-[#F5BA41] text-white py-1 px-3 rounded hover:bg-blue-600"
                  onClick={() => handleOpenModal(question)}
                >
                  Answer
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No questions found</div> // Handle empty state
      )}

      {isModalOpen && (
        <AnswerModal
          question={selectedQuestion}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAnswer}
        />
      )}
    </div>
  );
};

export default QuestionsPage;
