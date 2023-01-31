import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default function Main() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper h-96 flex items-center justify-center"
      >
        <SwiperSlide className="flex justify-center items-center">
          Slide 1
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          Slide 3
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          Slide 4
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          Slide 5
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          Slide 6
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          Slide 7
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          Slide 8
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          Slide 9
        </SwiperSlide>
      </Swiper>
    </>
  );
}
