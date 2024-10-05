import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-white border-t border-black text-black">
      {/* First Row */}
      <div className="px-8 py-12 md:flex md:justify-between md:items-start">
        {/* Column 1 */}
        <div className="mb-8 md:mb-0 w-full md:w-1/3 md:pl-4">
          {" "}
          {/* Added left padding */}
          <h2 className="font-bold mb-6">EARLY ACCESS</h2>
          <p className="text-lg mb-6">
            Sign up to our newsletter to receive exclusive offers.
          </p>
          <div className="flex border border-black/10 pl-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="focus:outline-none py-2 w-full md:w-3/4 mr-2 text-lg"
            />
            <button className="h-full bg-black py-2 px-5 text-white border-black hover:bg-[#D5B868] hover:text-black transition duration-300 text-lg">
              Subscribe
            </button>
          </div>
        </div>

        {/* Column 2 */}
        <div className="mb-8 md:mb-0 w-full md:w-1/3 text-center">
          <h2 className="font-medium uppercase mb-6">Menu</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/home/about-us"
                className="hover:underline hover:text-black font-light transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/home/contact-us"
                className="hover:underline hover:text-black font-light transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/home/policy"
                className="hover:underline hover:text-black font-light transition duration-300"
              >
                Policy
              </Link>
            </li>
            <li>
              <Link
                href="/home/terms-of-service"
                className="hover:underline hover:text-black font-light transition duration-300"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/home/faqs"
                className="hover:underline hover:text-black font-light transition duration-300"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="w-full md:w-1/3 h-full justify-center">
          <h2 className="uppercase font-medium mb-6">About</h2>
          <p className="font-extralight mb-4">
            Learn more about our mission and values.
          </p>
          <div className="flex justify-start self-end space-x-4 mt-4">
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
      <div className="border-t border-gray-300 text-center py-8">
        <p className="text-sm font-extralight">&copy; 2024 – OOOWAP</p>
      </div>
    </div>
  );
};

export default Footer;
