import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const cardsRef = useRef([]);

  // Apply parallax effect
  const applyParallaxEffect = (element) => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xOffset = (x / element.offsetWidth - 0.5) * 20; // Adjusted for a stronger effect
      const yOffset = (y / element.offsetHeight - 0.5) * 20; // Adjusted for a stronger effect

      gsap.to(element, {
        x: xOffset,
        y: yOffset,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  };

  // Remove parallax effect
  const removeParallaxEffect = (element) => {
    if (element && element._handleMouseMove) {
      element.removeEventListener('mousemove', () => {});

    }
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };
  const onButtonClick = () => {
    const pdfUrl = "https://drive.google.com/file/d/1zTMmqCkjqEIdpWYRUk2FTWpiol5aju-g/view?usp=sharing";
    window.open(pdfUrl, '_blank');
    
};
  useEffect(() => {
    cardsRef.current.forEach(card => {
      applyParallaxEffect(card);
    });

    return () => {
      cardsRef.current.forEach(card => {
        removeParallaxEffect(card);
      });
    };
  }, []);

  return (
    <section id="about" className="about-section p-8 lg:p-16 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="about-title text-5xl font-extrabold text-center text-blue-900 mb-12">
          About Me
        </h2>

        {/* About Card */}
        <div 
          ref={el => cardsRef.current[0] = el} 
          className="bg-white text-black p-8 rounded-lg shadow-lg mb-12 transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-500 hover:text-white"
        >
          <p className="text-lg leading-relaxed mb-4 text-start">
            Hi, I'm <strong>Afzaal Shoukat</strong>, A passionate Full Stack Developer with 2+ years of experience. My tech journey is fueled by solving complex problems through clean architecture and seamless user experiences. I build applications that balance performance, scalability, and engaging interactions always with maintainable code at the core.
          </p>
          <p className="text-lg leading-relaxed mb-4 text-start">
          My career journey has spanned dynamic roles where I've sharpened my expertise in full-stack development. Currently at <strong>Solinovation</strong>, I architect high-performance solutions using React, Next.js, Python, and C++—pushing the boundaries of scalable web and software systems.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-start">
          I've also contributed to projects at <strong>Fa Tech & Solutions</strong>, and as a freelancer on <strong>Fiverr</strong>. These diverse experiences have sharpened my full-stack expertise, from React frontends to Python/C++ backends, shaping me into a versatile developer who delivers robust solutions.
          </p>
          <button
            className="bg-gradient-to-r from-blue-900 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            onClick={onButtonClick }
          >
            Download CV
          </button>
        </div>

        {/* Skills and Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Card */}
          <div 
            ref={el => cardsRef.current[1] = el} 
            className="bg-white text-black p-8 rounded-lg shadow-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-500 hover:text-white"
          >
            <h3 className="text-3xl font-semibold mb-4 text-start">Skills</h3>
            <div className="grid grid-cols-2 gap-4 text-start">
              {[
                "JavaScript", "React.js", "Next.js", 
                "Python", "C++", 
                "Api Integration", "AI Integration",  
                "FastAPI", "MongoDB"
              ].map(skill => (
                <div key={skill} className="text-lg leading-relaxed flex items-center">
                  <span className="font-semibold mr-2">✔️</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience Card */}
          <div 
            ref={el => cardsRef.current[2] = el} 
            className="bg-white text-black p-8 rounded-lg shadow-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-500 hover:text-white"
          >
            <h3 className="text-3xl font-semibold mb-4 text-start">Professional Experience</h3>
            <div className="mb-4 text-lg leading-relaxed text-start">
              <strong>Fa Tech & Solutions</strong> (Current) -Full Stack Developer
            </div>
            
            <div className="mb-4 text-lg leading-relaxed text-start">
              <strong>Techloset</strong> (4 months) -Full Stack Developer
            </div>
            <div className="mb-4 text-lg leading-relaxed text-start">
              <strong>Fa Tech & Solutions</strong> (6 months) - Full Stack Developer
            </div>
            <div className="mb-4 text-lg leading-relaxed text-start">
              <strong>Fiverr</strong> (Current) - Full Stack Developer
            </div>
          </div>
        </div>

        {/* Future Goals Section */}
        <div 
          ref={el => cardsRef.current[3] = el} 
          className="bg-white text-black p-8 rounded-lg shadow-lg mt-12 transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-500 hover:text-white"
        >
          <h3 className="text-3xl font-semibold mb-4 text-start">Future Goals</h3>
          <p className="text-lg leading-relaxed text-start">
            Looking ahead, I am eager to continue my journey in the tech industry, with the ultimate goal of founding a large and impactful company. I am dedicated to pushing the boundaries of innovation and delivering solutions that make a difference.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
