"use client";

import { useState } from "react";

const AnswerModal = ({ question, onClose, onSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Answer Question</h2>
        <p className="mb-4">{question.question}</p>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            rows="4"
            placeholder="Your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#F5BA41] text-white rounded hover:bg-[#F5BA41]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerModal;
