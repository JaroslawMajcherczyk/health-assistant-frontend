import './Footer.scss'
import HealthAssistantLogo from '../../assets/Health-Assistant-Logo.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* GÓRNA CZĘŚĆ */}
      <div className="footer-header">
        <img src={HealthAssistantLogo} alt="Health Assistance Logo" className="logo" />
        <p className="company-type">Cooperative Society in Public Limited Company Form</p>
      </div>

      {/* KOLUMNY */}
      <div className="footer-columns">
        <div className="column">
          <h4><span className="dot" /> Contacts</h4>
          <p><strong>Legal and operative site</strong></p>
          <p>Via di Santa Cornelia, 9</p>
          <p>00060 Formello (RM) – Italy</p>
          <p>Tax ID code 12989581009</p>
        </div>

        <div className="column">
          <h4><span className="dot" /> Contact Center Centrale Salute</h4>
          <p><strong>Number from Italy</strong> 06.40416113</p>
          <p><strong>Number from abroad</strong> +39.06.90198080</p>
          <p><strong>Fax</strong> 06.77607611</p>
        </div>

        <div className="column">
          <h4><span className="dot" /> Services</h4>
          <ul>
            <li>Health facilities</li>
            <li>House assistance</li>
            <li>Ambulance transfers</li>
            <li>Banca delle Visite</li>
          </ul>
        </div>

        <div className="column">
          <h4><span className="dot" /> Health Assistance</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li>About Us</li>
            <li>Services</li>
            <li>Health Central</li>
            <li>Frequent questions</li>
            <li>Contacts</li>
          </ul>
        </div>

        <div className="column">
          <h4><span className="dot" /> Useful links</h4>
          <ul>
            <li>Administration of reimbursement</li>
            <li>Forms</li>
            <li>Network Reserved Area</li>
            <li>Reserved area</li>
          </ul>
        </div>
      </div>

      {/* STOPKA NA DOLE */}
      <div className="footer-bottom">
        <p>© 2025 Health Assistant | All Rights Reserved | <a href="#">Privacy Policy</a> – <a href="#">Cookie Policy</a></p>
        <p>Created by <a href="#">JM</a></p>
      </div>
    </footer>
  )
}
