import React from 'react';
import './AboutImageSection.scss';
import AboutPhoto from '../../../assets/About_Photo_1.jpg';

const AboutImageSection = () => {
  return (
    <section className="about-image">
      <img src={AboutPhoto} alt="Doctor using AI assistant" />
    </section>
  );
};

export default AboutImageSection;
