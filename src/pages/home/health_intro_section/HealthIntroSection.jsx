import './HealthIntroSection.scss'
import CountUp from 'react-countup';

export default function HealthIntroSection() {
  return (
    <section className="health-intro">
      <div className="left-content">
        <h1>
          AT THE SERVICE OF <br /> PERSONAL HEALTH
        </h1>

        <p className="description">
        <strong>Health Assistance</strong> is more than just technology — it's your personal ally in navigating the complex healthcare landscape. 
        From early diagnosis to continuous monitoring, our platform empowers patients and healthcare professionals with the tools
         to make informed, timely decisions. We seamlessly integrate modern medical knowledge with cutting-edge digital systems 
         to offer services that are efficient, secure, and patient-centered.
        </p>

        <button className="cta-button">Find out more</button>
      </div>

      <div className="right-metrics">
        <div className="box">
          <p>The <strong>practices managed</strong> by Health Assistance</p>
          <h2>+<CountUp className="big-number" end={1300000} duration={3} separator="." /></h2>
        </div>
        <div className="box">
          <p>The funds managed by us declare an average <strong>% of claim</strong> of</p>
          <h2><CountUp className="big-number" end={0.63} duration={2} decimals={2} decimal="," /><span>%</span></h2>
          <p>compared to the practices managed</p>
        </div>
      </div>
    </section>
  );
}
