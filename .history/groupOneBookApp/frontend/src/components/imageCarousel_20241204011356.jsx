import React, { useEffect, useRef, useState } from "react";
import book1 from "../assets/images/book1.jpg";
import book2 from "../assets/images/book2.jpg";
import book3 from "../assets/images/book3.jpg";
import book4 from "../assets/images/book4.jpg";
import book5 from "../assets/images/book5.jpg";
import book6 from "../assets/images/book6.jpg";
import book7 from "../assets/images/book7.jpg";

const Carousel = () => {
  const carouselRef = useRef(null);
  const [bookCovers, setBookCovers] = useState([book1, book2, book3, book4, book5]);

  useEffect(() => {
    const carousel = carouselRef.current;

    // Function to duplicate content dynamically
    const ensureEnoughContent = () => {
      const visibleWidth = carousel.offsetWidth; // Width of the visible area
      const totalContentWidth = carousel.scrollWidth; // Current total content width

      if (totalContentWidth < 2 * visibleWidth) {
        // Duplicate the content until total width is sufficient
        setBookCovers((prev) => prev.concat(prev));
      }
    };

    // Run the duplication logic
    ensureEnoughContent();

    let scrollSpeed = 0.5; // Adjust this to control scroll speed

    const scroll = () => {
      carousel.scrollLeft += scrollSpeed;

      // Reset scrollLeft when reaching the end of the duplicated content
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      }

      requestAnimationFrame(scroll); // Continuous animation
    };

    scroll(); // Start the scrolling animation

    return () => cancelAnimationFrame(scroll); // Cleanup on unmount
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {bookCovers.map((cover, index) => (
          <img key={index} src={cover} alt={`Book Cover ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
