"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBitbucket } from "react-icons/fa";

const Hero = () => {
  // Carousel state to track current slide
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 4 ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 4 : prev - 1));
  };

  return (
    <div className="bg-secondary w-full py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Text Section */}
        <div className="flex flex-col justify-center md:items-start gap-5 md:text-start text-center items-center lg:gap-10 p-4 md:p-8">
          <h1 className="text-3xl uppercase md:text-5xl font-extralight text-black">
            Borrow all your <span className="font-bold">Favourites</span>
          </h1>
          <Link
            href="/shop"
            className="flex gap-2 items-center bg-black text-white px-8 py-1.5 text-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <FaBitbucket />
            View Inventory
          </Link>
        </div>

        {/* Image Carousel Section */}
        <div className="relative w-full px-5">
          <div className="w-full h-[450px] rounded-md overflow-hidden">
            {/* Slide 1 */}
            <div
              className={`relative w-full h-full ${
                currentSlide === 1 ? "block" : "hidden"
              }`}
            >
              <Image
                src="/images/Purse1.jpg"
                alt="Purse 1"
                className="w-full h-full object-cover"
                width={600}
                height={450}
              />
            </div>

            {/* Slide 2 */}
            <div
              className={`relative w-full h-full ${
                currentSlide === 2 ? "block" : "hidden"
              }`}
            >
              <Image
                src="/images/Purse2.jpg"
                alt="Purse 2"
                className="w-full h-full object-cover"
                width={600}
                height={450}
              />
            </div>

            {/* Slide 3 */}
            <div
              className={`relative w-full h-full ${
                currentSlide === 3 ? "block" : "hidden"
              }`}
            >
              <Image
                src="/images/Purse3.jpg"
                alt="Purse 3"
                className="w-full h-full object-cover"
                width={600}
                height={450}
              />
            </div>

            {/* Slide 4 */}
            <div
              className={`relative w-full h-full ${
                currentSlide === 4 ? "block" : "hidden"
              }`}
            >
              <Image
                src="/images/Purse4.jpg"
                alt="Purse 4"
                className="w-full h-full object-cover"
                width={600}
                height={450}
              />
            </div>

            {/* Carousel Controls */}
            <div className="group absolute w-full h-full left-0 px-10 items-center top-0 flex justify-between">
              <button
                onClick={prevSlide}
                className="text-white text-3xl -mx-10 group-hover:mx-0 transition-all ease-in duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Previous Slide"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="text-white text-3xl -mx-10 group-hover:mx-0 transition-all ease-in duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Next Slide"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
