import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Testimonials.css";

// Import local images from src/assets/img
import Img1 from "/assets/img/1.png";
import Img2 from "/assets/img/2.png";
import Img3 from "/assets/img/3.png";
import Img4 from "/assets/img/4.png";

export default function Testimonials() {
  const swiperRef = useRef(null);

  const testimonials = [
    { name: "John Doe", role: "Plumbing Client", review: "Excellent service! Quick response and professional work. Highly recommended.", image: Img2 },
    { name: "Sarah Smith", role: "Homeowner", review: "The plumber was friendly and fixed my sink problem in no time. Will hire again.", image: Img1 },
    { name: "Michael Brown", role: "Restaurant Owner", review: "Very reliable! They handled a big job for my restaurant and everything works perfectly now.", image: Img3 },
    { name: "Emily Johnson", role: "Apartment Tenant", review: "Affordable pricing and top-notch service. My bathroom leak was fixed immediately!", image: Img4 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 relative">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Clients Say</h2>

      {/* Custom Arrows */}
      <button className="custom-prev" onClick={() => swiperRef.current.swiper.slidePrev()}>&#10094;</button>
      <button className="custom-next" onClick={() => swiperRef.current.swiper.slideNext()}>&#10095;</button>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={false} // disable default arrows
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <img
                src={t.image}
                alt={t.name}
                className="mx-auto rounded-full mb-4"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover", // ensures image fits inside circle
                }}
              />

              <p className="italic text-gray-600 mb-4">“{t.review}”</p>
              <h3 className="font-semibold">{t.name}</h3>
              <span className="text-sm text-gray-500">{t.role}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
