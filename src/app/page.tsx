"use client"; // Mark this file as a Client Component

import "./landing.css"; // Import custom CSS for the landing page
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useState } from "react";


export default function LandingPage() {
  const router = useRouter();
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    // Trigger fade-out effect
    setIsFading(true);

    // After animation ends, navigate to the movies page
    setTimeout(() => {
      router.push("/movies");
    }, 1000); // The timeout should match the animation duration
  };

  return (
    <div className={`landing-container ${isFading ? "fade-out" : ""}`}>
      <div className="landing-box">
        <div className="landing-title">
          <span className="landing-block"></span>
          <h1>
            Voovo<span></span>
          </h1>
        </div>

        <div className="landing-role">
          <div className="landing-block"></div>
          <p>Movie & TV Show Recommendations</p>
        </div>
      </div>
      <footer className="landing-texto" onClick={handleClick}>
        <span>
          <i className="fab fa-youtube"></i> Explore more titles
        </span>
      </footer>
    </div>
  );
}
