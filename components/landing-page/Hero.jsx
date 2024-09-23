"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
        <div className="flex flex-col justify-center items-start space-y-4 p-4 md:p-8">
          <h1 className="text-5xl md:text-7xl font-light text-black">
            Borrow all your <span className="font-bold">Favourites</span>
          </h1>
          <Link
            href="/shop"
            className="bg-black text-white px-8 py-4 text-lg hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            View Inventory
          </Link>
        </div>

        {/* Image Carousel Section */}
        <div className="relative w-full">
          <div className="carousel w-full h-[450px]">
            {/* Slide 1 */}
            <div
              className={`carousel-item relative w-full h-full ${
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
              className={`carousel-item relative w-full h-full ${
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
              className={`carousel-item relative w-full h-full ${
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
              className={`carousel-item relative w-full h-full ${
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
            <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
              <button
                onClick={prevSlide}
                className="btn btn-circle"
                aria-label="Previous Slide"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="btn btn-circle"
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
