import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation, Autoplay } from "swiper";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { motion, animate, initial, AnimatePresence } from "framer-motion";

export default function Main() {
  //make the animation
  const listVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.4,
        duration: 1.6,
        when: "beforeChildren",
      },
    },
    hidden: {
      x: "100vw",
      opacity:0,
      transition: {
        duration: 10,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        className="h-screen flex flex-col gap-4"
        variants={listVariants}
        initial="initial"
        animate="visible"
        exit="hidden"
      >
        <div className="flex-initial">
          <Header />
        </div>
        <div className="rounded shadow-md drop-shadow-xl shadow-primary_dark_blue flex-auto mt-6">
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper w-full h-full"
          >
            <SwiperSlide className="flex justify-center items-center relative">
              <div class="p-4">
                <div className="aspect-w-7 aspect-h-4 md:aspect-w-7 md:aspect-h-3">
                  <img
                    src="/images/products/cover 405.png"
                    alt="cover 405"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div className="py-4 px-12 bg-primary_dark_blue w-full rounded bg-opacity-70 text-primary_light_gray -mt-8">
                  <h1 className="text-xl font-bold mb-2">cover 405</h1>
                  <p className="flex items-center gap-2 font-bold">
                    peugeot 405
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    totam minima assumenda accusamus nostrum, officia at cumque,
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
              <div class="p-4">
                <div className="aspect-w-7 aspect-h-4 md:aspect-w-7 md:aspect-h-3">
                  <img
                    src="/images/products/cover 206.png"
                    alt="cover 206"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div className="py-4 px-12 bg-primary_dark_blue w-full rounded bg-opacity-70 text-primary_light_gray -mt-8">
                  <h1 className="text-xl font-bold mb-2">cover 206</h1>
                  <p className="flex items-center gap-2 font-bold">
                    peugeot 405
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    totam minima assumenda accusamus nostrum, officia at cumque,
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
              <div class="p-4">
                <div className="aspect-w-7 aspect-h-4 md:aspect-w-7 md:aspect-h-3">
                  <img
                    src="/images/products/cover pride.png"
                    alt="cover pride"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div className="py-4 px-12 bg-primary_dark_blue w-full rounded bg-opacity-70 text-primary_light_gray -mt-8">
                  <h1 className="text-xl font-bold mb-2">cover pride</h1>
                  <p className="flex items-center gap-2 font-bold">Pride</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    totam minima assumenda accusamus nostrum, officia at cumque,
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
              <div class="p-4">
                <div className="aspect-w-7 aspect-h-4 md:aspect-w-7 md:aspect-h-3">
                  <img
                    src="/images/products/cover tiba.png"
                    alt="cover tiba"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div className="py-4 px-12 bg-primary_dark_blue w-full rounded bg-opacity-70 text-primary_light_gray -mt-8">
                  <h1 className="text-xl font-bold mb-2">cover tiba</h1>
                  <p className="flex items-center gap-2 font-bold">Tiba</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    totam minima assumenda accusamus nostrum, officia at cumque,
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
              <div class="p-4">
                <div className="aspect-w-7 aspect-h-4 md:aspect-w-7 md:aspect-h-3">
                  <img
                    src="/images/products/cover 405.png"
                    alt="cover 405"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div className="py-4 px-12 bg-primary_dark_blue w-full rounded bg-opacity-70 text-primary_light_gray -mt-8">
                  <h1 className="text-xl font-bold mb-2">cover 405</h1>
                  <p className="flex items-center gap-2 font-bold">
                    peugeot 405
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    totam minima assumenda accusamus nostrum, officia at cumque,
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
              <div class="p-4">
                <div className="aspect-w-7 aspect-h-4 md:aspect-w-7 md:aspect-h-3">
                  <img
                    src="/images/products/spring seat 206.png"
                    alt="spring seat 206"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div className="py-4 px-12 bg-primary_dark_blue w-full rounded bg-opacity-70 text-primary_light_gray -mt-8">
                  <h1 className="text-xl font-bold mb-2">spring seat 206</h1>
                  <p className="flex items-center gap-2 font-bold">
                    peugeot 206
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    totam minima assumenda accusamus nostrum, officia at cumque,
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
              <div class="p-4">
                <div className="aspect-w-7 aspect-h-4 md:aspect-w-7 md:aspect-h-3">
                  <img
                    src="/images/products/spring seat tiba.png"
                    alt="spring seat tiba"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div className="py-4 px-12 bg-primary_dark_blue w-full rounded bg-opacity-70 text-primary_light_gray -mt-8">
                  <h1 className="text-xl font-bold mb-2">spring seat tiba</h1>
                  <p className="flex items-center gap-2 font-bold">tiba</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    totam minima assumenda accusamus nostrum, officia at cumque,
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex-none h-14 bg-primary_dark_blue rounded flex justify-center items-center">
          <Footer />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
