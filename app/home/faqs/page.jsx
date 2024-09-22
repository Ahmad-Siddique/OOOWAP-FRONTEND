"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "daisyui/dist/full.css"; // Ensure DaisyUI's styles are imported

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the purpose of this website?",
      answer:
        "This website allows users to exchange similar-priced products. Users pay a small shipping fee for the exchange, and after the exchange is completed, the money is refunded to their wallet.",
    },
    {
      question: "How do I start an exchange?",
      answer:
        "To start an exchange, select the product you want to exchange, and follow the prompts to choose a similar-priced product. After confirmation, you will need to pay the shipping fee.",
    },
    {
      question: "What types of products can be exchanged?",
      answer:
        "You can exchange products of similar value. Ensure the items are in good condition and meet our exchange criteria.",
    },
    {
      question: "How long does the exchange process take?",
      answer:
        "The exchange process typically takes 7-10 business days, including shipping time. We will keep you updated throughout the process.",
    },
    {
      question: "Is there a limit to the number of exchanges I can make?",
      answer:
        "There is no set limit on the number of exchanges you can make. However, frequent exchanges may be reviewed to ensure compliance with our policies.",
    },
    {
      question: "What happens if my exchange is canceled?",
      answer:
        "If your exchange is canceled, you will receive a full refund of the shipping fee to your wallet. The original product will be returned to you.",
    },
    {
      question: "Can I track my exchange?",
      answer:
        "Yes, you will receive tracking information for your exchange once it has been processed. You can track the status through your account dashboard.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact customer support through the 'Contact Us' page on our website. We are here to assist you with any questions or issues you may have.",
    },
    {
      question: "What are the shipping fees for exchanges?",
      answer:
        "The shipping fee is calculated based on the weight and dimensions of the product. You will see the fee before confirming your exchange.",
    },
    {
      question: "How do I update my account information?",
      answer:
        "To update your account information, log in to your account and navigate to the 'Account Settings' page. From there, you can update your personal details.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-black text-center py-6">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-t border-gray-300">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleAccordion(index)}
              >
                <h2 className="text-xl font-semibold text-black">
                  {faq.question}
                </h2>
                {openIndex === index ? (
                  <FaChevronUp className="text-[#F5BA41] text-2xl" />
                ) : (
                  <FaChevronDown className="text-[#F5BA41] text-2xl" />
                )}
              </div>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
