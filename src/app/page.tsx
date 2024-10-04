"use client"; // Mark this file as a Client Component

import "./landing.css"; // Import custom CSS for the landing page
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isFading, setIsFading] = useState(false);
  const [preferences, setPreferences] = useState(""); // New state for preferences
  const [recommendations, setRecommendations] = useState(""); // New state for recommendations

  const handleClick = () => {
    // Trigger fade-out effect
    setIsFading(true);

    // After animation ends, navigate to the movies page
    setTimeout(() => {
      router.push("/movies");
    }, 1000); // The timeout should match the animation duration
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fetch recommendations based on preferences
    const openAiResponse = await fetch("/api/get-recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ preferences }),
    });

    const result = await openAiResponse.json();
    setRecommendations(result.recommendations);
  };

  return (
    <div className={`landing-container ${isFading ? "fade-out" : ""}`}>
      {/* Title Section - Moved to the top */}
      <div className="title-section">
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

      {/* Input Form Section - Placed separately below the title */}
      <div className="form-section">
  <form onSubmit={handleSubmit}>
    <h2>Enter your movie preferences</h2>
    <textarea
      value={preferences}
      onChange={(e) => setPreferences(e.target.value)}
      placeholder="e.g., I like action movies, comedies, or movies like Inception."
      rows={4}
      cols={50}
      style={{ color: 'black' }} // This sets the typed text color to black
    />
    <br />
    <button type="submit">Get Recommendations</button>
  </form>

  {/* Display recommendations if they exist */}
  {recommendations && (
    <div>
      <h2>AI Movie Recommendations</h2>
      <p>{recommendations}</p>
    </div>
  )}
</div>


      <footer className="landing-texto" onClick={handleClick}>
        <span>
          <i className="fab fa-youtube"></i> Explore more titles
        </span>
      </footer>
    </div>
  );
}
