// src/app/page.tsx (for landing page)
// import Link from "next/link";
import "./landing.css"; // Import custom CSS for the landing page

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-box">
        <div className="landing-title">
          <span className="landing-block"></span>
          <h1>
            Your App Name<span></span>
          </h1>
        </div>

        <div className="landing-role">
          <div className="landing-block"></div>
          <p>Movie & TV Show Recommendations</p>
        </div>
      </div>
      <a href="/movies">
        <footer className="landing-texto">
          <span>
            <i className="fab fa-youtube"></i> Explore more titles
          </span>
        </footer>
      </a>
    </div>
  );
}
