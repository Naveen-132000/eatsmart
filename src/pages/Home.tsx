import React from 'react';
import Hero from '../components/Hero';
import OfferComparison from '../components/OfferComparison';
import Categories from '../components/Categories';
import WhyEatSmart from '../components/WhyEatSmart';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <OfferComparison />
      <Categories />
      <WhyEatSmart />
      <Testimonials />
    </>
  );
};

export default Home;