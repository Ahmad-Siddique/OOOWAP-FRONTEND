"use client";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "daisyui/dist/full.css"; // Ensure DaisyUI's styles are imported
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Set initial state only on the client side
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left Column */}
        <div className="flex flex-col justify-center px-6 lg:px-12 py-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-black mb-6">Drop Us a Line</h1>
          <p className="text-lg text-gray-700 mb-8">
            If you have any questions or need further assistance, feel free to
            reach out to us. We are here to help and will respond as soon as
            possible. Your feedback and inquiries are very important to us, and
            we strive to provide the best service possible. Thank you for
            getting in touch with us!
          </p>
          <div className="space-y-6">
            {[
              {
                icon: <FaPhoneAlt className="text-4xl text-[#F5BA41]" />,
                title: "Phone",
                description: "+41 71 227 76 90",
              },
              {
                icon: <FaEnvelope className="text-4xl text-[#F5BA41]" />,
                title: "Email",
                description: "help@ooowap.com",
              },
              {
                icon: <FaMapMarkerAlt className="text-4xl text-[#F5BA41]" />,
                title: "Address",
                description: "Miami, Florida",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-black">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center px-6 lg:px-12 py-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-black mb-6">Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-black mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5BA41] transition duration-150 ease-in-out"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-black mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5BA41] transition duration-150 ease-in-out"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-black mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5BA41] transition duration-150 ease-in-out"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#F5BA41] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-[#F5BA41] transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUsPage;
