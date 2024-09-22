
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
        <div className="mb-8 md:mb-0 w-full md:w-1/3 md:pl-4">
          {" "}
          {/* Added left padding */}
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
            <button className="btn bg-black text-white border-black hover:bg-[#D5B868] hover:text-black transition duration-300 text-lg">
              Subscribe
            </button>
          </div>
        </div>

        {/* Column 2 */}
        <div className="mb-8 md:mb-0 w-full md:w-1/3 text-center">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#D5B868] transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#D5B868] transition duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#D5B868] transition duration-300"
              >
                Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#D5B868] transition duration-300"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#D5B868] transition duration-300"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="w-full md:w-1/3 justify-center">
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
