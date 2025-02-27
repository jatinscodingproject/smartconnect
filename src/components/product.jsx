import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import newc from '../assets/newc.png'

const relatedProducts = [
  {
    id: 1,
    title: "Rounded Edges",
    price: "$10",
    image: newc,
  },
  {
    id: 2,
    title: "Rounded Edges",
    price: "$10",
    image:newc,
  },
  {
    id: 3,
    title: "Rounded Edges",
    price: "$10",
    image: newc,
  },
  {
    id: 4,
    title: "Rounded Edges",
    price: "$10",
    image: newc,
  },
];

export default function RelatedProducts() {
  return (
    <div className="max-w-5xl max-h-full mx-auto my-10 px-10">
      <h2 className="text-xl font-semibold mb-4">Related Products</h2>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 4 },
          }}
          className="relative"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id} className="p-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold">{product.title}</h3>
                  <p className="text-gray-500 text-sm">
                    Starting from{" "}
                    <span className="text-red-500 font-semibold">
                      {product.price}
                    </span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation Buttons */}
        <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow-md">
          <ChevronLeft size={20} />
        </button>
        <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow-md">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
