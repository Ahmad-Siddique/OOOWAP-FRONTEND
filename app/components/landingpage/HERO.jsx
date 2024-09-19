import React from "react";
import Image from "next/image";

const HERO = () => {
  return (
    <div className="bg-[#D5B868] w-full py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Text Section */}
        <div className="flex flex-col justify-center items-start space-y-4 p-4 md:p-8">
          <h1 className="text-4xl font-bold text-black">
            Join The Community <br />
            Borrow All Your Favorite Items
          </h1>
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            View Inventory
          </button>
        </div>

        {/* Image Carousel Section */}
        <div className="relative w-full">
          <div className="carousel w-full h-[450px]">
            {/* Slide 1 */}
            <div id="slide1" className="carousel-item relative w-full h-full">
              <Image
                src="/images/Purse1.jpg"
                alt="Purse 1"
                className="w-full h-full object-cover"
                width={600}
                height={450}
                layout="responsive"
              />
              <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                <a
                  href="#slide4"
                  className="btn btn-circle"
                  aria-label="Previous Slide"
                >
                  ❮
                </a>
                <a
                  href="#slide2"
                  className="btn btn-circle"
                  aria-label="Next Slide"
                >
                  ❯
                </a>
              </div>
            </div>
            {/* Slide 2 */}
            <div id="slide2" className="carousel-item relative w-full h-full">
              <Image
                src="/images/Purse2.jpg"
                alt="Purse 2"
                className="w-full h-full object-cover"
                width={600}
                height={450}
                layout="responsive"
              />
              <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                <a
                  href="#slide1"
                  className="btn btn-circle"
                  aria-label="Previous Slide"
                >
                  ❮
                </a>
                <a
                  href="#slide3"
                  className="btn btn-circle"
                  aria-label="Next Slide"
                >
                  ❯
                </a>
              </div>
            </div>
            {/* Slide 3 */}
            <div id="slide3" className="carousel-item relative w-full h-full">
              <Image
                src="/images/Purse3.jpg"
                alt="Purse 3"
                className="w-full h-full object-cover"
                width={600}
                height={450}
                layout="responsive"
              />
              <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                <a
                  href="#slide2"
                  className="btn btn-circle"
                  aria-label="Previous Slide"
                >
                  ❮
                </a>
                <a
                  href="#slide4"
                  className="btn btn-circle"
                  aria-label="Next Slide"
                >
                  ❯
                </a>
              </div>
            </div>
            {/* Slide 4 */}
            <div id="slide4" className="carousel-item relative w-full h-full">
              <Image
                src="/images/Purse4.jpg"
                alt="Purse 4"
                className="w-full h-full object-cover"
                width={600}
                height={450}
                layout="responsive"
              />
              <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                <a
                  href="#slide3"
                  className="btn btn-circle"
                  aria-label="Previous Slide"
                >
                  ❮
                </a>
                <a
                  href="#slide1"
                  className="btn btn-circle"
                  aria-label="Next Slide"
                >
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HERO;
