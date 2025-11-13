import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Services() {
  const services = [
    {
      title: "Water Heater Repair",
      icon: "fa fa-tint",
      description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam justo.",
    },
    {
      title: "Drain Repair",
      icon: "fa fa-water",
      description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam justo.",
    },
    {
      title: "Toilet Pipe Repair",
      icon: "fa fa-toilet",
      description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam justo.",
    },
    {
      title: "Sewer Line Repair",
      icon: "fa fa-shower",
      description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam justo.",
    },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="row g-0">
        <div className="col-lg-3 d-none d-lg-flex">
          <div className="d-flex align-items-center justify-content-center bg-primary w-100 h-100">
            <h1 className="display-3 text-white m-0" style={{ transform: "rotate(-90deg)" }}>
              15 Years Experience
            </h1>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="ms-lg-5 ps-lg-5">
            <div className="text-center text-lg-start mb-4">
              <h6 className="text-secondary text-uppercase">Our Services</h6>
              <h1>Explore Our Services</h1>
            </div>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {services.map((s, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-light p-4 h-100">
                    <div
                      className="d-flex align-items-center justify-content-center border border-5 border-white mb-4"
                      style={{ width: 75, height: 75 }}
                    >
                      <i className={`${s.icon} fa-2x text-primary`} />
                    </div>
                    <h4 className="mb-3">{s.title}</h4>
                    <p>{s.description}</p>
                    <p className="text-primary fw-medium">
                      <i className="fa fa-check text-success me-2" />
                      Quality Service
                    </p>
                    <p className="text-primary fw-medium">
                      <i className="fa fa-check text-success me-2" />
                      Customer Satisfaction
                    </p>
                    <p className="text-primary fw-medium">
                      <i className="fa fa-check text-success me-2" />
                      Support 24/7
                    </p>
                    <a href="#" className="btn bg-white text-primary w-100 mt-2">
                      Read More <i className="fa fa-arrow-right text-secondary ms-2" />
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
