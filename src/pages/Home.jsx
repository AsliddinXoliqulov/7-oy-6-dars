import React from 'react';
import SwiperSlider from '../components/SwiperSlider';
import ZonCards from '../components/ProductCard';
import Features from '../components/Features';

const Home = () => {
  return (
    <div className="px-4 py-6">
      <SwiperSlider />
      <Features/>
      <div><h1 className='sm:text-3xl text-xl font-bold text-center my-5'>Product</h1></div>
      <ZonCards />
    </div>
  );
};

export default Home;