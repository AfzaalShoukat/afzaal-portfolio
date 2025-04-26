import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

const HeaderDescription = ({ heading, description, showComma = true, className }) => {
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);
  const location = useLocation(); // Track the current location

  useEffect(() => {
    // Initial animation to move elements from bottom to their original positions
    gsap.fromTo(
      [headerRef.current, descriptionRef.current],
      { y: 50, opacity: 0 }, // Start position (below the screen)
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        delay: 0.5, // Delay before starting animation
        stagger: 0.3 // Add a stagger effect between animations
      }
    );

    // Cleanup function to prevent repeated animation
    return () => {
      gsap.killTweensOf([headerRef.current, descriptionRef.current]);
    };
  }, [location.pathname]); // Run animation when route changes

  return (
    <div className={`intro-text ${className} text-left w-full sm:w-3/4 lg:w-1/2 mx-auto`}>
      <h1 ref={headerRef} className="leading-10 sm:leading-12 text-3xl sm:text-4xl font-bold">
        <span className="text-white">{heading.primary} </span>
        <span className="text-gold">{heading.secondary}</span>
        {showComma && ','}
        <br />
        <span className="text-gold">{heading.tertiary}</span>
      </h1>
      <p ref={descriptionRef} className="leading-6 sm:leading-8 text-lg sm:text-xl">
        {description}
      </p>
    </div>
  );
};

export default HeaderDescription;
