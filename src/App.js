import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown,faComments } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import Header from './components/header/js/header';
import Home from './screens/home';
import About from './screens/about';
import Contact from './screens/contact';
import Experience from './screens/experience';
import Projects from './screens/projects';
import Skills from './screens/skills';
import Testimonial from './screens/testimonials';
import Footer from './screens/footer';
import './App.css';
import ChatForm from './screens/chat';
function App() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const createRainEffect = (element) => {
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('rain-container', 'absolute', 'inset-0', 'overflow-hidden', 'pointer-events-none');

    for (let i = 0; i < 20; i++) {
      const drop = document.createElement('div');
      drop.classList.add('rain-drop', 'bg-gradient-to-b', 'from-blue-200', 'to-blue-500', 'absolute', 'w-1', 'h-4', 'rounded-full', 'opacity-50');
      gsap.set(drop, {
        x: gsap.utils.random(0, element.offsetWidth),
        y: gsap.utils.random(-element.offsetHeight, -10),
        scale: gsap.utils.random(0.5, 1.5)
      });
      rainContainer.appendChild(drop);
    }
    element.appendChild(rainContainer);
    gsap.to(rainContainer.children, {
      y: element.offsetHeight,
      duration: 1,
      stagger: 0.1,
      repeat: -1,
      ease: 'power2.in'
    });
  };

  const removeRainEffect = (element) => {
    const rainContainer = element.querySelector('.rain-container');
    if (rainContainer) {
      gsap.killTweensOf(rainContainer.children);
      rainContainer.remove();
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const homeHeading = {
    primary: 'Welcome to ',
    secondary: 'My Portfolio',
    tertiary: 'Crafting Beautiful Experiences'
  };

  const homeDescription = 
    'As a passionate Full Stack Developer, I specialize in building high-performance web applications and robust software solutions. My expertise in React, Next.js, Python, and C++ allows me to create scalable systems that combine powerful functionality with seamless user experiences. Lets collaborate to transform your ideas into efficient, real-world solutions';

  const aboutHeading = {
    primary: 'About Me',
    secondary: '',
    tertiary: 'Get to know my journey'
  };

  const aboutDescription = 
    'I am a passionate Full Stack Developer dedicated to building efficient, scalable solutions. My journey in tech is driven by solving complex problems through clean code and innovative system design';

  const experienceHeading = {
    primary: 'My Experience',
    secondary: '',
    tertiary: 'A look at my professional background'
  };

  const experienceDescription = 
    'With years of building systems in React, Next.js, Python and C++, I delivered high-performance solutions that solve real-world problems while maintaining clean, maintainable codebases.';

  const projectsHeading = {
    primary: 'My Projects',
    secondary: '',
    tertiary: 'Showcasing what I have built'
  };

  const projectsDescription = 
    'Explore my projects highlighting React, Next.js. Each one demonstrates my commitment to clean architecture, performance, and innovative problem-solving.';

  const skillsHeading = {
    primary: 'My Skills',
    secondary: '',
    tertiary: 'What I do best'
  };

  const skillsDescription = 
    'I specialize in React, Next.js, Python, and C++. My skill set allows me to build responsive, high-performance web applications and scalable backend systems.';

  const testimonialHeading = {
    primary: 'Testimonials',
    secondary: '',
    tertiary: 'What others say about my work'
  };

  const testimonialDescription = 
    'Hear from clients and collaborators about my technical leadership and the measurable impact delivered across full-stack projects.';

  const contactHeading = {
    primary: 'Contact Me',
    secondary: '',
    tertiary: 'Let’s get in touch!'
  };

  const contactDescription = 
    'Let’s connect! Whether you have a project idea, need technical advice, or just want to discuss tech—I’m always open to conversations.';
    const [isChatOpen, setChatOpen] = useState(false); // State to manage chat form visibility

    const toggleChatForm = () => {
      setChatOpen(!isChatOpen);
    };
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header heading={homeHeading} description={homeDescription} showComma={true} showHome={true} />
                <Home />
              </>
            } 
          />
          <Route 
            path="/about" 
            element={
              <>
                <Header heading={aboutHeading} description={aboutDescription} showComma={false} showHome={false} />
                <About />
              </>
            } 
          />
          <Route 
            path="/experience" 
            element={
              <>
                <Header heading={experienceHeading} description={experienceDescription} showComma={false} showHome={false} />
                <Experience />
              </>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <>
                <Header heading={projectsHeading} description={projectsDescription} showComma={false} showHome={false} />
                <Projects />
              </>
            } 
          />
          <Route 
            path="/skills" 
            element={
              <>
                <Header heading={skillsHeading} description={skillsDescription} showComma={false} showHome={false} />
                <Skills />
              </>
            } 
          />
          <Route 
            path="/testimonial" 
            element={
              <>
                <Header heading={testimonialHeading} description={testimonialDescription} showComma={false} showHome={false} />
                <Testimonial />
              </>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <>
                <Header heading={contactHeading} description={contactDescription} showComma={false} showHome={false} />
                <Contact />
              </>
            } 
          />
        </Routes>
        <Footer />
        <div className="fixed bottom-10 right-4">
        <button
    ref={scrollButtonRef}
    className="bg-gradient-to-r from-blue-900 to-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
    onClick={showScrollUp ? scrollToTop : scrollToBottom}
    onMouseEnter={() => createRainEffect(scrollButtonRef.current)}
    onMouseLeave={() => removeRainEffect(scrollButtonRef.current)}
  >
    <FontAwesomeIcon icon={showScrollUp ? faArrowUp : faArrowDown} />
  </button>
  
  <button
    className="bg-gradient-to-r from-blue-900 to-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ml-4"
    onClick={toggleChatForm}
  >
    <FontAwesomeIcon icon={faComments} /> {/* Add chat icon here */}
    Chat
  </button>
</div>

{isChatOpen && <ChatForm onClose={toggleChatForm} />} {/* Render the chat form */}
      </div>
    </Router>
  );
}

export default App;
