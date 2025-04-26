import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
import RealisticRainAndIceWithLightEffect from '../components/animation/particleAnimation';

const Footer = () => {
  useEffect(() => {
    gsap.from(".footer-icon", {
      duration: 1,
      opacity: 0,
      y: 20,
      stagger: 0.2,
      ease: "power4.out",
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-800 text-white py-10">
      <RealisticRainAndIceWithLightEffect />
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center p-2 rounded transition duration-300">
                <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                <a href="tel:+923424627671" className="hover:underline">+92 304 462 1015</a>
              </li>
              <li className="flex items-center p-2 rounded transition duration-300">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <a href="mailto:afzaalshazada@gmail.com" className="hover:underline">afzaalshazada@gmail.com</a>
              </li>
              <li className="flex items-center p-2 rounded transition duration-300">
                <FontAwesomeIcon icon={faComment} className="mr-2" />
                <a href="skype:live:.cid.47bcdb44a5769124?chat" className="hover:underline">skype:live:.cid.e5edb6d65194152b</a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="text-3xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li className="hover:bg-gradient-to-r from-blue-900 to-blue-500 p-2 rounded transition duration-300">
                <NavLink to="/" onClick={scrollToTop} className="block hover:underline">Home</NavLink>
              </li>
              <li className="hover:bg-gradient-to-r from-blue-900 to-blue-500 p-2 rounded transition duration-300">
                <NavLink to="/about" onClick={scrollToTop} className="block hover:underline">About Us</NavLink>
              </li>
              <li className="hover:bg-gradient-to-r from-blue-900 to-blue-500 p-2 rounded transition duration-300">
                <NavLink to="/experience" onClick={scrollToTop} className="block hover:underline">Experience</NavLink>
              </li>
              <li className="hover:bg-gradient-to-r from-blue-900 to-blue-500 p-2 rounded transition duration-300">
                <NavLink to="/projects" onClick={scrollToTop} className="block hover:underline">Projects</NavLink>
              </li>
              <li className="hover:bg-gradient-to-r from-blue-900 to-blue-500 p-2 rounded transition duration-300">
                <NavLink to="/skills" onClick={scrollToTop} className="block hover:underline">Skills</NavLink>
              </li>
              <li className="hover:bg-gradient-to-r from-blue-900 to-blue-500 p-2 rounded transition duration-300">
                <NavLink to="/testimonial" onClick={scrollToTop} className="block hover:underline">Testimonials</NavLink>
              </li>
              <li className="hover:bg-gradient-to-r from-blue-900 to-blue-500 p-2 rounded transition duration-300">
                <NavLink to="/contact" onClick={scrollToTop} className="block hover:underline">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="text-3xl font-bold mb-4 text-white">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/afzaalshoukat/"
                className="text-white text-3xl hover:bg-gradient-to-r from-blue-900 to-blue-500 transition-colors duration-300 p-4 rounded-full shadow-lg transform hover:scale-110 hover:rotate-360"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://www.github.com/AfzaalShoukat"
                className="text-white text-3xl hover:bg-gradient-to-r from-blue-900 to-blue-500 transition-colors duration-300 p-4 rounded-full shadow-lg transform hover:scale-110 hover:rotate-360"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500 text-sm z-10">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
