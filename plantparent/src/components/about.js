import './about.css';
import plantImage1 from './plantImage1.png';
import plantImage2 from './plantImage2.png';
import productDesignImage from './sampleDesign.png';

function About() {
   return (
      <div className="about-container">
         <h2>🌱 About Plant Parent 🌱</h2>
         <p>
            Plant Parent is an innovative IoT-based automated plant care project designed to help users manage the health and growth of their indoor plants effortlessly.
            Through real-time monitoring and intelligent adjustments for watering, lighting, and climate control, Plant Parent ensures plants thrive without constant user intervention.
         </p>

         <h3>Project Overview</h3>
         <p>
            The Plant Parent system uses sensors to track soil moisture, light levels, and temperature, adjusting plant care based on these readings.
            A mobile app or web interface enables users to manage their plants remotely, providing real-time updates and personalized care recommendations.
         </p>

         <h3>Project Goals</h3>
         <ul>
            <li>Automate daily plant care tasks like watering and lighting.</li>
            <li>Monitor plant health through real-time sensor data.</li>
            <li>Provide a convenient interface for plant care scheduling and remote management.</li>
            <li>Enhance user experience with AI-driven personalized plant care advice.</li>
         </ul>

         <h3>Key Features</h3>
         <ul>
            <li>
               <strong>AI Chatbot Assistance:</strong> Users can upload plant photos or provide descriptions, and the AI will identify the plant type and offer care suggestions.
               The chatbot can also answer questions about watering needs, light requirements, and soil recommendations.
            </li>
            <li>
               <strong>Remote Control & Real-time Alerts:</strong> Users can control moisture, light, humidity, and temperature remotely. Receive notifications for water levels,
               sensor issues, and recommended adjustments for plant care.
            </li>
            <li>
               <strong>Predictive Care with Machine Learning:</strong> By analyzing sensor data over time, the system can predict plant needs and make proactive adjustments.
            </li>
         </ul>

         <h3>System Overview</h3>
         <p>
            The Plant Parent system includes an embedded microcontroller connected to sensors (moisture, light, temperature) and actuators (water pump, lights).
            The microcontroller processes sensor data and manages plant care automatically. Users can access the system via a mobile app or web interface,
            hosted on cloud services for real-time control and updates.
         </p>

         <h3>Functional Requirements</h3>
         <ul>
            <li>Plant holder with embedded hardware for automated care.</li>
            <li>Remote access via a web page for device control and monitoring.</li>
            <li>Automated control of watering, lighting, and climate settings based on sensor data.</li>
            <li>User registration and login with cloud data storage for multi-device access.</li>
            <li>AI Chatbot for plant identification, care recommendations, and user assistance.</li>
         </ul>

         <h3>Non-functional Requirements</h3>
         <ul>
            <li>User-friendly interface with tutorial and accessibility features for non-technical users.</li>
            <li>Notifications for sensor wear, water levels, and sunlight conditions.</li>
            <li>Regular recommendations to update care settings based on plant growth cycles.</li>
         </ul>

         <h3>Conceptual Design</h3>
         <p>
            The system comprises a microcontroller connected to various sensors and actuators, programmed using Python. A mobile app, developed with Flutter or React Native,
            interacts with a cloud-hosted backend (e.g., AWS or Google Cloud), providing a seamless experience for users to monitor and manage their plants.
         </p>

         <h3>Example Design of Product</h3>
         <p>
            Below is an example of the product's potential design. This image illustrates the plant holder, sensors, and automated systems that make up the Plant Parent solution.
         </p>
         <div className="product-design-image">
            <img src={productDesignImage} alt="Example design of Plant Parent" className="plant-photo" />
         </div>

         <div className="wow-section">
            <h4>Let's take our plants from struggling to thriving!</h4>
            <div className="plant-images">
               <img src={plantImage1} alt="Struggling plant" className="plant-photo" />
               <span className="arrow">➡️</span>
               <img src={plantImage2} alt="Flourishing plant" className="plant-photo" />
            </div>
         </div>
      </div>
   );
}

export default About;