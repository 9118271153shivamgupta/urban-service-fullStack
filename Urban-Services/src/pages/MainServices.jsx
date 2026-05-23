import React from 'react'
import AllServicesPage from '../components/Main_Services_Page/AllServicesPage'
import ServicesPage from '../components/homesection/home_Service_Section/ServicesPage'
import MenuServicesPage from '../components/Main_Services_Page/MenuServicesPage'
import Footer from '../components/Footer'
import QuickConnect from '../components/QuickConnect'


const MainServices = () => {
  return (
    <div>
      {/* <AllServicesPage/> */}
      <ServicesPage showButton={false} />
       <QuickConnect/>
      <Footer/>
       {/* <MenuServicesPage/> */}
    </div>
  )
}

export default MainServices
