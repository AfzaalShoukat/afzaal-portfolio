import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

const HeaderDescription = ({ heading, description, showComma = true, className }) => {
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(
      [headerRef.current, descriptionRef.current],
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: 0.2, 
        stagger: 0.2,
        ease: 'power2.out'
      }
    );

    return () => {
      gsap.killTweensOf([headerRef.current, descriptionRef.current]);
    };
  }, [location.pathname]);

  return (
    <div className={`text-left ${className}`}>
      <h1 ref={headerRef} className="text-base sm:text-lg md:text-2xl font-bold leading-tight">
        <span className="text-white">{heading.primary} </span>
        <span className="text-yellow-300">{heading.secondary}</span>
        {showComma && ','}
        <br />
        <span className="text-yellow-300">{heading.tertiary}</span>
      </h1>
      <p ref={descriptionRef} className="text-sm sm:text-base md:text-lg mt-1">
        {description}
      </p>
    </div>
  );
};

export default HeaderDescription;