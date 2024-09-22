

const Carousal = () => {
  return (
    <div className="bg-[#D5B868] w-full py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          <div className="relative h-150">
            <img
              src="/images/pic1.jpg"
              className="w-full h-full object-fit rounded-lg"
              alt="Gallery Image 1"
            />
          </div>
          <div className="relative h-150">
            <img
              src="/images/pic2.jpg"
              className="w-full h-full object-fit rounded-lg"
              alt="Gallery Image 2"
            />
          </div>
          <div className="relative h-150">
            <img
              src="/images/pic3.jpg"
              className="w-full h-full object-fit rounded-lg"
              alt="Gallery Image 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
