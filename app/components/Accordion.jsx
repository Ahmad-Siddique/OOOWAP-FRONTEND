// components/Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-300">
    <button
      className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-100 focus:outline-none"
      onClick={onClick}
    >
      <span className="text-lg font-semibold text-black">{question}</span>
      {isOpen ? (
        <FaChevronUp className="text-gray-600" />
      ) : (
        <FaChevronDown className="text-gray-600" />
      )}
    </button>
    {isOpen && (
      <div className="p-4 bg-gray-50">
        <p className="text-gray-700">{answer}</p>
      </div>
    )}
  </div>
);

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={index === openIndex}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
