import React from 'react';
import './AboutIntroSection.scss';

const AboutIntroSection = () => {
  return (
    <section className="about-intro">
      <h2>
        We are a <span className="highlight">digital assistant</span> focused on 
        <span className="highlight"> supporting doctors</span> in the process of 
        <span className="highlight"> diagnosing patients</span>, powered by <span className="highlight">AI technologies</span>.
      </h2>

      <p>
        Health Assistant accelerates medical workflows and improves precision by offering 
        AI-based transcription, entity recognition and intelligent assistance to simplify 
        and <strong>optimize patient documentation</strong>. 
        Our platform helps doctors save time, reduce administrative burden, and deliver faster care.
        <br /><br />
        <strong>Our goal is to enhance diagnostics</strong> by combining voice input with intelligent text extraction,
        ensuring accurate and complete medical records. Thanks to this, <strong>healthcare professionals</strong> 
        can focus on what matters most — the patient.
      </p>
    </section>
  );
};

export default AboutIntroSection;
