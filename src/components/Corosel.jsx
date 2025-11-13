import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Corosel() {
  const slides = [
    {
      title: "Efficient Residential Plumbing Services",
      subtitle: "Plumbing & Repairing Services",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.",
      image: "/assets/img/carousel-1.jpg",
    },
    {
      title: "Efficient Commercial Plumbing Services",
      subtitle: "Plumbing & Repairing Services",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.",
      image: "/assets/img/carousel-2.jpg",
    },
  ];

  return (
    <div className="container-fluid p-0 mb-5">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="position-relative">
              <img
                className="img-fluid w-100"
                src={slide.image}
                alt={slide.title}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                style={{ background: "rgba(0, 0, 0, 0.4)" }}
              >
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-10 col-lg-8">
                      <h5 className="text-white text-uppercase mb-3">
                        {slide.subtitle}
                      </h5>
                      <h1 className="display-3 text-white mb-4">
                        {slide.title}
                      </h1>
                      <p className="fs-5 fw-medium text-white mb-4 pb-2">
                        {slide.description}
                      </p>
                      <a
                        href="#"
                        className="btn btn-primary py-md-3 px-md-5 me-3"
                      >
                        Read More
                      </a>
                      <a
                        href="#"
                        className="btn btn-secondary py-md-3 px-md-5"
                      >
                        Free Quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Corosel;
