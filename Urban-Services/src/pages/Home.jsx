import React, { useState } from 'react'
import HeroSection from '../components/homesection/HeroSection'
import HomeAbout from '../components/homesection/HomeAbout'


import OurProcess from '../components/OurProcess'
import QuickConnect from '../components/QuickConnect'
import CustomerReviews from '../components/homesection/customerReviews/CustomerReviews'
import Footer from '../components/Footer'
import ServicesPage from '../components/homesection/home_Service_Section/ServicesPage'
import WhyChooseUs from '../components/WhyChoosUs/WhyChooseUs'
import BookingForm from '../components/BookingForm'
// import GoogleMap from '../components/GoogleMap'

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div>
    
     <HeroSection onOpenForm={() => setIsFormOpen(true)} />
      
      {/* Modal component */}
      <BookingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      
    
    <ServicesPage/>
    <HomeAbout/>
    <WhyChooseUs/>
    <OurProcess/>
    
    <CustomerReviews/>
     <QuickConnect/>
      <Footer/>
    {/* <GoogleMap/> */}
    </div>
  )
}

export default Home
