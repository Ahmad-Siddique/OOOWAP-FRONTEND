"use client";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "daisyui/dist/full.css"; // Make sure you have DaisyUI's styles imported

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col justify-center px-4">
          <h1 className="text-4xl font-bold text-black mb-4">Drop Us a Line</h1>
          <p className="text-lg text-gray-700 mb-6">
            If you have any questions or need further assistance, feel free to
            reach out to us. We are here to help and will respond as soon as
            possible. Your feedback and inquiries are very important to us, and
            we strive to provide the best service possible. Thank you for
            getting in touch with us!
          </p>
          <div className="space-y-4">
            {[
              {
                icon: <FaPhoneAlt className="text-3xl text-black" />,
                title: "Call Us",
                description:
                  "We are available 24/7 for any inquiries. Give us a call at +1 (123) 456-7890.",
              },
              {
                icon: <FaEnvelope className="text-3xl text-black" />,
                title: "Email Us",
                description:
                  "Send us an email at support@example.com. We will get back to you within 24 hours.",
              },
              {
                icon: <FaMapMarkerAlt className="text-3xl text-black" />,
                title: "Visit Us",
                description:
                  "Our office is located at 123 Main Street, Anytown, USA. We welcome visitors by appointment.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 border p-4 rounded-lg shadow-md bg-white"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-black">
                    {item.title}
                  </h2>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center px-4">
          <h2 className="text-3xl font-bold text-black mb-4">Contact Form</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg text-black mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-black px-3 py-2 rounded-lg"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg text-black mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-black px-3 py-2 rounded-lg"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-lg text-black mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full border border-black px-3 py-2 rounded-lg"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#F5BA41] text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
