
import Slider from "react-slick";

const CarouselLogos = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-logos mb-10">
      <Slider {...settings}>
        <div>
          <img
            width="30px"
            height="auto"
            src="https://images.unsplash.com/photo-1719937050601-969f4f25d060?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo 1"
          />
        </div>
        <div>
          <img
            width="30px"
            height="auto"
            src="https://images.unsplash.com/photo-1719937050601-969f4f25d060?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo 2"
          />
        </div>
        <div>
          <img
            width="30px"
            height="auto"
            src="https://images.unsplash.com/photo-1719937050601-969f4f25d060?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo 3"
          />
        </div>{" "}
        <div>
          <img
            width="30px"
            height="auto"
            src="https://images.unsplash.com/photo-1719937050601-969f4f25d060?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo 3"
          />
        </div>
        <div>
          <img
            width="30px"
            height="auto"
            src="https://images.unsplash.com/photo-1719937050601-969f4f25d060?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo 3"
          />
        </div>
        {/* Add more logo images here */}
      </Slider>
    </div>
  );
};

export default CarouselLogos;
