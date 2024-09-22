
import Image from "next/image"; // Use Image component for optimized images
import "./hehe.css";

const Page = () => {
  return (
    <div>
      <div className="w-full h-full absolute">
        <div
          className="w-1/4 h-full absolute z-50 left-0"
          style={{
            background:
              "linear-gradient(to right, #edf2f7 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        ></div>
        <div
          className="w-1/4 h-full absolute z-50 right-0"
          style={{
            background:
              "linear-gradient(to left, #edf2f7 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        ></div>
      </div>

      <div
        className="carousel-items flex items-center justify-center"
        style={{
          width: "fit-content",
          animation: "carouselAnim 10s infinite alternate linear",
        }}
      >
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
            style={{ width: "270px" }}
          >
            <Image
              className="h-16 w-16 rounded-full shadow-2xl"
              src="https://images.unsplash.com/photo-1611162618828-bc409f073cbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dW5zcGxhc2glMjBsb2dvfGVufDB8fDB8fHww"
              alt="Img"
              width={64}
              height={64}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
