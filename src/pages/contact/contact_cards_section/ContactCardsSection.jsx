import React from 'react';
import './ContactCardsSection.scss';

const ContactCardsSection = () => {
  return (
    <section className="contact-cards-section">
      <div className="card">
        <p className="icon">↩</p>
        <h3 className="title">Centrale Salute</h3>
        <ul>
          <li>– Form in the Request Assistance/Complaints section in your Reserved Area</li>
          <li>– The number reserved for your agreement</li>
          <li>– The number <a href="tel:0640416113">06.40416113</a></li>
          <li>– By fax to the number 06 77607611</li>
        </ul>
      </div>

      <div className="card">
        <p className="icon">↩</p>
        <h3 className="title">Dispatch doctor or ambulance</h3>
        <p>Dedicated number for Assistance Sending a doctor to your home or an ambulance.</p>
        <p><strong>Toll Free Number:</strong><br /><a href="tel:800598635">800.598.635</a></p>
      </div>

      <div className="card">
        <p className="icon">↩</p>
        <h3 className="title">EXCLUSIVELY dedicated to Network Structures</h3>
        <p>or to those who intend to apply for the agreement</p>
        <p><strong>Conventions Office:</strong> <a href="tel:069019801">06.9019801</a> (Key 2)</p>
        <p><strong>E-mail:</strong> <a href="mailto:network@healthassistance.it">network@healthassistance.it</a></p>
      </div>

      <div className="contact-info">
        <h3>Contact Center<br /><em>Centrale Salute</em></h3>
        <p><strong>Number from Italy:</strong><br /><a href="tel:0640416113">06.40416113</a></p>
        <p><strong>Number from abroad:</strong><br /><a href="tel:+390690198080">+39 06 9019 8080</a></p>
        <p><strong>Legal and operative site</strong><br />
          Via di Santa Cornelia, 9<br />
          00060 Formello (RM) – Italia
        </p>
        <p><strong>PEC:</strong><br />
          <a href="mailto:healthassistance@legalmail.it">healthassistance@legalmail.it</a>
        </p>
      </div>
    </section>
  );
};

export default ContactCardsSection;
