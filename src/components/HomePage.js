import React from "react";
import { Link } from "react-router-dom";
// import './HomePage.css'; // import CSS file for styling

function HomePage() {
  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="content-container">
        <h1>Welcome to Kiran's Fitness Club</h1>
        <p>
          Get fit and stay healthy with our range of fitness programs and
          equipment.
        </p>
        <h2>Our Programs</h2>
        <ul>
          <li>Weightlifting</li>
          <li>Cardio</li>
          <li>Yoga</li>
          <li>Pilates</li>
        </ul>
        <h2>Join Now</h2>
        <p>
          Sign up for a membership today and start your fitness journey with us!
        </p>
        <Link to="/loginmem">
          <button className="my-button">Join Now</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
