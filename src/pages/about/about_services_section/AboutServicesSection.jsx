import React from 'react';
import './AboutServicesSection.scss';
import AboutPhoto2 from '../../../assets/About_Photo_2.jpg';

const AboutServicesSection = () => {
  return (
    <section className="about-services">
      <div className="text-content">
        <h2>
          We offer <strong>personalized</strong>, <strong>efficient</strong> and <strong>smart</strong> solutions in the healthcare industry
        </h2>
        <p>
          Our platform supports a broad network of facilities and services, including nursing homes,
          diagnostic labs, physiotherapy clinics, dental offices, and home care cooperatives —
          ensuring coverage across the entire medical landscape.
        </p>
        <p>
          We stand out through <strong>strong agreements</strong>, <strong>structured workflows</strong>,
          and <strong>optimization of medical plans</strong>. We follow healthcare compliance principles,
          including support for public health standards and sustainable operations.
        </p>
        <p>
          Beyond automation, we provide <strong>consulting in medical and administrative domains</strong>,
          including audits, call center systems, and trained staff in clinics — from specialists to internal experts.
        </p>
        <p>
          Ultimately, Health Assistant enables healthcare providers to deliver <strong>more efficient care</strong>,
          reduce delays, and improve satisfaction by streamlining daily operations.
        </p>
      </div>

      <div className="image-content">
        <img src={AboutPhoto2} alt="Healthcare corridor with staff" />
      </div>
    </section>
  );
};

export default AboutServicesSection;
