import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-white text-black">
      {/* First Row */}
      <div className="px-8 py-12 md:flex md:justify-between md:items-start">
        {/* Column 1 */}
        <div className="mb-8 md:mb-0 w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">EARLY ACCESS</h2>
          <p className="text-lg mb-4">
            Sign up to our newsletter to receive exclusive offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full md:w-3/4 mr-2 text-lg"
            />
            <button className="btn btn-primary text-lg">Subscribe</button>
          </div>
        </div>

        {/* Column 2 */}
        <div className="mb-8 md:mb-0 w-full md:w-1/3 text-center">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-lg mb-4">
            Learn more about our mission and values.
          </p>
          <div className="flex justify-start space-x-4 mt-4">
            <a href="#" className="text-xl hover:text-gray-700">
              <FaFacebookF />
            </a>
            <a href="#" className="text-xl hover:text-gray-700">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl hover:text-gray-700">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-gray-700">
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="border-t border-gray-300 text-center py-4">
        <p className="text-lg">&copy; 2024 – OOOWAP</p>
      </div>
    </div>
  );
};

export default Footer;
