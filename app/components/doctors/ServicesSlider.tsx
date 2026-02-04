"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Stethoscope, Check } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function ServicesSlider({ services }: { services: string[] }) {
  if (!services || services.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-slate-100">
      <h3 className="font-bold text-teal-950 mb-6 flex items-center gap-2 text-xl font-jakarta">
        <Stethoscope size={24} className="text-teal-500" /> Services Offered
      </h3>
      
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 }, // Tablet: 2 slides
          1024: { slidesPerView: 3 }, // Desktop: 3 slides inside the column
        }}
        className="pb-12" // Padding for pagination bullets
      >
        {services.map((service, index) => (
          <SwiperSlide key={index} className="h-auto">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 h-full flex flex-col hover:border-teal-200 transition-colors group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 mb-4 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-all">
                <Check size={20} />
              </div>
              <p className="font-bold text-slate-700 leading-snug group-hover:text-teal-900 transition-colors">
                {service}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}