import Image from "next/image";

const Carousal = () => {
  return (
    <div className="bg-[#FAFAFA] flex items-center justify-center w-full py-16 px-4">
      <div className="grid grid-cols-1 max-w-[57%] w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        <div className="relative h-150">
          <Image
            height={700}
            width={500}
            src="/images/pic1.jpg"
            className="w-full h-full rounded-lg"
            alt="Gallery Image 1"
          />
        </div>
        <div className="relative h-150">
          <Image
            height={700}
            width={500}
            src="/images/pic3.jpg"
            className="w-full h-full rounded-lg"
            alt="Gallery Image 2"
          />
        </div>
        <div className="relative h-150">
          <Image
            height={700}
            width={500}
            src="/images/pic2.jpg"
            className="w-full h-full rounded-lg"
            alt="Gallery Image 3"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousal;
