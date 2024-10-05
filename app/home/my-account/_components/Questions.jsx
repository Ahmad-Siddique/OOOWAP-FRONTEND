"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionsPage = ({ productId }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL+`/product/${productId}/questions`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [productId]);

  const handleAnswerClick = (question) => {
    setSelectedQuestion(question);
    setAnswer("");
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!answer) return;

    try {
      await axios.post(`/api/question/${selectedQuestion._id}/answer`, {
        answer,
      });
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === selectedQuestion._id
            ? {
                ...q,
                answer,
                answeredBy: { username: "You" },
                answeredAt: new Date(),
              }
            : q
        )
      );
      setSelectedQuestion(null);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Questions</h1>
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question._id} className="border p-4 rounded shadow-md">
            <p className="font-semibold">{question.question}</p>
            <p className="text-gray-600">
              Asked by: {question.askedBy.username}
            </p>
            {question.answer ? (
              <p className="mt-2 text-green-600">Answered: {question.answer}</p>
            ) : (
              <button
                className="mt-2 text-blue-500 hover:underline"
                onClick={() => handleAnswerClick(question)}
              >
                Answer Question
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Answer Question</h2>
            <form onSubmit={handleAnswerSubmit}>
              <textarea
                className="border border-gray-300 rounded p-2 w-full h-24"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedQuestion(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
