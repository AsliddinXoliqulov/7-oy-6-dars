import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_URL = import.meta.env.VITE_API_URL;

export default function SwiperSlider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/swiper`)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error("Error loading images:", err));
  }, []);

  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000 }}
      >
        {images.map(img => (
          <SwiperSlide key={img.id}>
            <img
              src={img.image}
              alt={`Slide ${img.id}`}
              className="w-full sm:h-96 object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
