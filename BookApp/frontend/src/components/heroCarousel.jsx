// HeroCarousel.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import writerSpotlight from "../assets/images/writer-spotlight.png";
import writerSpotlight2 from "../assets/images/writer-spotlight-2.png";
import writerSpotlight3 from "../assets/images/writer-spotlight-3.png";

// Example slides array—customize these objects however you like.
const heroSlides = [
  {
    title: "Elif Shafak on the Importance and Vulnerability of Rivers",
    copy: `
      Telling the interconnected stories of three people who live on the 
      banks of either the Tigris or the Thames, Elif Shafak's acclaimed 
      There Are Rivers in the Sky is steeped in the texture, culture and 
      politics of water.
    `,
    imageUrl: writerSpotlight,
    ctaLabel: "READ MORE",
    ctaOnClickPath: "/bind",
    backgroundColor: "#0052CC",
  },
  {
    title: "Monica Heisey on Her Favourite Comic Novels",
    copy: `
      Crackling with humour and punchy one-liners, our Fiction Book of the Month Really Good, Actually, is the delicious debut novel from the screenwriter of the much lauded Schitt's Creek TV series and follows the hilarious and sometimes cringeworthy escapades of a fresh divorcee as she embarks on her post-matrimonial life.
    `,
    imageUrl: writerSpotlight2,
    ctaLabel: "READ MORE",
    ctaOnClickPath: "/discover/magic",
    backgroundColor: "#fc5401",
  },
  {
    title: "Katy Hessel on the Pioneering Sculptor Camille Claudel",
    copy: `
      When The Story of Art Without Men was originally published in hardback in 2022, Katy Hessel's stunningly presented volume immediately became recognised as a game-changing work of art history, going on to be named Waterstones Book of the Year.
    `,
    imageUrl: writerSpotlight3,
    ctaLabel: "READ MORE",
    ctaOnClickPath: "/summer-reads",
    backgroundColor: "#e41e60",
  },
  // …add more slides if you like…
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = heroSlides.length;
  const autoplayRef = useRef(null);

  // Automatically advance slides every 8 seconds:
  useEffect(() => {
    autoplayRef.current = () => {
      setCurrentIndex((prev) => (prev + 1) % slideCount);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      autoplayRef.current();
    }, 8000); // change to whatever ms you like
    return () => clearInterval(interval);
  }, []);

  // Handler to go to “previous” slide (wraps around)
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  // Handler to go to “next” slide (wraps around)
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  };

  // Handler for when a dot is clicked
  const goToIndex = (idx) => {
    setCurrentIndex(idx);
  };

  return (
    <div className="hero-carousel-container">
      {/*— This wrapper “clips” overflow so only one slide shows —*/}
      <div className="carousel-slider-wrapper">
        <div
          className="carousel-slides"
          style={{
            transform: `translateX(-${(currentIndex * 100) / slideCount}%)`,
            width: `${slideCount * 100}%`,
          }}
        >
          {heroSlides.map((slide, idx) => (
            <div
              className="carousel-slide"
              key={idx}
              style={{
                backgroundColor: slide.backgroundColor,
                width: `${100 / slideCount}%`,
              }}
            >
              <div className="carousel-slide-content">
                {/* LEFT: Textual Content */}
                <div className="carousel-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.copy}</p>
                  <button
                    className="carousel-cta"
                    onClick={() => navigate(slide.ctaOnClickPath)}
                  >
                    {slide.ctaLabel}
                  </button>
                </div>

                {/* RIGHT: Image */}
                <div className="carousel-image-wrapper">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="carousel-image"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* — Prev / Next Arrows — */}
      <button className="carousel-arrow prev-arrow" onClick={handlePrev}>
        ‹
      </button>
      <button className="carousel-arrow next-arrow" onClick={handleNext}>
        ›
      </button>

      {/* — Dots / Pagination — */}
      <div className="carousel-dots">
        {heroSlides.map((_, idx) => (
          <span
            key={idx}
            className={
              idx === currentIndex ? "dot dot-active" : "dot"
            }
            onClick={() => goToIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;