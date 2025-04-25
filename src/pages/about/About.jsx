import React from 'react'
import Footer from '../footer/Footer'
import AboutIntroSection from './about_intro_section/AboutIntroSection'
import AboutImageSection from './about_image_section/AboutImageSection'
import AboutServicesSection from './about_services_section/AboutServicesSection'
import AboutHeader from './about_header/AboutHeader'

const About = () => {
  return (
    <> 
    <br></br>
    <br></br>
    <br></br>
    <AboutHeader />
    <br></br>
    <br></br>
    <AboutIntroSection />
    <br></br>
    <br></br>
    <br></br>
    <AboutImageSection />
    <br></br>
   
    
    <AboutServicesSection />
    <br></br>
    <br></br>
    <br></br>
    <Footer />
    </>
  )
}

export default About