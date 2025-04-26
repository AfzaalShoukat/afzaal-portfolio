import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ParticleAnimation from '../../animation/particleAnimation';
import HeaderDescription from './description';

const Header = ({ heading, description, showComma = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <>
      <header className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-900 to-blue-500 text-white overflow-hidden">
        <ParticleAnimation />

        <div className="absolute top-6 left-6 lg:hidden z-50">
          <button
            className="flex items-center justify-center w-12 h-12 bg-transparent hover:bg-blue-700 rounded-full transition duration-300"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {menuOpen ? (
              <div className="w-6 h-6 text-white text-2xl">✕</div>
            ) : (
              <div className="w-6 h-6 text-white text-2xl">☰</div>
            )}
          </button>
        </div>

        <div className={`fixed inset-0 bg-blue-800 bg-opacity-95 z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full p-6 relative">
            <ul className="flex flex-col items-center space-y-4">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Testimonial', 'Contact'].map((text, index) => (
                <li key={index}>
                  <NavLink 
                    to={['/', '/about', '/experience', '/projects', '/skills', '/testimonial', '/contact'][index]} 
                    className={({ isActive }) => `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'hover:text-gold hover:underline'}`}
                    onClick={() => {
                      toggleMenu(); 
                      scrollToTop();
                    }}
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HeaderDescription 
  heading={heading} 
  description={description} 
  showComma={showComma} 
  className="
    absolute 
    bottom-21 left-4 right-auto px-1 
    xs:bottom-21 xs:left-3 xs:right-auto xs:px-1
    sm:bottom-20 sm:left-4 sm:right-auto sm:px-1 
    md:bottom-17 md:left-6 md:right-auto md:px-6 
    lg:bottom-13 lg:left-8 lg:right-auto lg:px-8 
    xl:bottom-8 xl:left-10 xl:right-auto xl:px-10
    2xl:bottom-2 2xl:left-12 2xl:right-auto 2xl:px-12
  "
/>


      </header>

      <nav className="hidden lg:flex lg:fixed lg:top-0 lg:left-0 lg:w-full lg:bg-gradient-to-r lg:from-blue-900 lg:to-blue-500 lg:p-6 shadow-md z-50">
        <ul className="flex flex-row items-center space-x-6">
          {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Testimonial', 'Contact'].map((text, index) => (
            <li key={index}>
              <NavLink 
                to={['/', '/about', '/experience', '/projects', '/skills', '/testimonial', '/contact'][index]} 
                className={({ isActive }) => `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'text-white hover:text-gold hover:underline'}`}
                onClick={scrollToTop}
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;
