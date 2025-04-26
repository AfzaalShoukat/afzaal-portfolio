import React, { useEffect, useState} from 'react';
import Slider from 'react-slick';
import { gsap } from 'gsap';
import { sendEmail } from '../components/api/contact';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import JavaScript from '../images/javascript.svg';
import React1 from '../images/react.png';
import Nextjs from '../images/nextjs.svg'
import Cplus from '../images/Cplus.svg'
import Api from '../images/api.svg';
import Python from '../images/python.svg';
import AI from '../images/ai.svg';
import FastApi from '../images/FastAPI.svg';
import Mongo from '../images/MongoDB.svg';
import Resume from '../images/Resume.jpeg'
import FoodyZone from '../images/FoodyZone.png'
import Ecommerce from '../images/Ecommerce.jpg'
import SocialMediaDashboard from '../images/SocialMediaDashboard.jpeg'
import Chatbot from '../images/chatbot.png'
import Funsgame from '../images/funsgame.jpeg'

import cryptoTrading from '../images/cryptoTrading.png';

const AllComponents = ({ showSkills = false, showExperience = false, showProjects = false, showTestimonials = false ,showContact=false}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const [formData, setFormData] = useState({
    senderEmail: '',
    senderName: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendEmail(formData.senderName, formData.senderEmail, formData.message);
      setSubmissionStatus('Your message has been sent successfully.');
      setFormData({ senderName: '', senderEmail: '', message: '' });
    } catch (error) {
      setSubmissionStatus('There was an error sending your message. Please try again later.');
    }
    setIsSubmitting(false);
  };
  
  const [isLoaded] = useState(true);
 
  useEffect(() => {



    if (isLoaded) {
      // Button Hover Effects
     

      // Card Hover Effects
      const cards = document.querySelectorAll('.project-card,.experience-card, .skill-card, .testimonial-card,.contact-card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { backgroundColor: '#38bdf8', duration: 0.5, ease: 'power2.out' }); // Sky blue color
          createRainEffect(card);
          applyParallaxEffect(card);
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { backgroundColor: '#ffffff', duration: 0.5, ease: 'power2.out' });
          removeRainEffect(card);
          removeParallaxEffect(card);
        });
      });
    }
  }, [isLoaded]);



  const createRainEffect = (element) => {
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('rain-container', 'absolute', 'inset-0', 'overflow-hidden', 'pointer-events-none');

    for (let i = 0; i < 40; i++) {
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

  const applyParallaxEffect = (element) => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xOffset = (x / element.offsetWidth - 0.5) * 10;
      const yOffset = (y / element.offsetHeight - 0.5) * 10;

      gsap.to(element, {
        x: xOffset,
        y: yOffset,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  };

  const removeParallaxEffect = (element) => {
    element.removeEventListener('mousemove', () => {});
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };
  const skills = [
  
  { name: 'JavaScript', icon: JavaScript },
  { name: 'React.js', icon: React1 },
  { name: 'Next.js', icon: Nextjs },
  { name: 'Python', icon: Python },
  { name: 'C++', icon: Cplus },
  { name: 'Api Integration', icon: Api },
  { name: 'AI Integration', icon: AI },
  { name: 'FastAPI', icon: FastApi },
  { name: 'MongoDB', icon: Mongo },
];
const experience = [
  {
    title: 'Senior Full Stack Developer',
    company: 'FA Tech & Solutions',
    duration: 'Jul 2024 - present',
    location: 'Remote',
    description: [
      'Full Stack Architecture: Designed and implemented end-to-end solutions using React, Next.js, and Python FastAPI, ensuring seamless integration between frontend and backend systems.',
      'Performance Optimization: Improved application speed by 30%+ through code splitting (Next.js), caching strategies, and Python backend optimizations.',
      'Technical Leadership: Spearheaded cross-functional teams in agile environments, delivering 5+ production-grade applications with CI/CD pipelines.'
    ]
  },
  
  {
    title: 'Mid-Level Full Stack Developer',
  company: 'Techloset Solution',
  duration: 'March 2024 - June 2024',
  location: 'Faisalabad, Pakistan',
  description: [
    'React, Next.js, Python, and API Development: Integrated third-party APIs with modern frontends (Next.js) and Python backends to enhance functionality while optimizing UI/UX and performance.',
    'Expanded technical skills by mastering Python for backend systems alongside existing JavaScript expertise.'
    ]
  },
  {
    title: 'Junior Full Stack Developer',
  company: 'FA Tech & Solutions',
  duration: 'January 2023 - March 2024',
  location: 'Faisalabad, Pakistan',
  description: [
    'React, JavaScript, Python, and API Integration: Developed responsive UIs with React, integrated RESTful APIs with Python backends, and enhanced user experience through performance optimizations.',
    'Expanded skills in full-stack development by building end-to-end features combining frontend (React/JavaScript) and backend (Python) technologies.'
    ]
  },
  {
    title: 'Freelance Full Stack Developer',
  company: 'Fiverr',
  duration: 'October 2022 - Present',
  location: 'Remote',
  description: [
    'React, Next.js & Python: Delivered 10+ client projects by building responsive frontends (React/Next.js) and REST APIs (Python/FastAPI), focusing on performance and clean architecture.',
    'Full Stack Solutions: Integrated third-party services (payment, maps, auth) while optimizing UX/UI and backend efficiency for diverse clients.'
    ]
  },
];
const testimonials = [
    { name: 'Rami Zafar', text: 'Afzaal did an amazing job. His code was high quality, and he was very helpful.' },
    { name: 'Amina Tariq', text: 'Working with Afzaal was great. He is a skilled developer and very professional.' },
    { name: 'Farah Malik', text: 'Afzaal worked on our project very well. He was efficient and effective.' },
    { name: 'Zain Abbas', text: 'Afzaal’s work was outstanding. He delivered excellent code and support.' },
    { name: 'Nura Ashraf', text: 'I had a wonderful experience with Zohaib. He is a talented developer.' },
    { name: 'Samir Yousaf', text: 'Afzaal is very professional. He managed our project smoothly and successfully.' },
    { name: 'Dalia Hossain', text: 'Afzaal was a pleasure to work with. He delivered on time and exceeded our expectations.' },
    { name: 'Amir Farooq', text: 'I appreciated Afzaal’s attention to detail. His work was exceptional.' },
    { name: 'Layla Rehman', text: 'Afzaal is reliable and skilled. I would highly recommend him for any project.' },
    { name: 'Hassan Javed', text: 'Afzaal helped us a lot. His solutions were practical and effective.' },
    { name: 'Fatima Jaan', text: 'Working with Afzaal was a great experience. He was always available for support.' },
    { name: 'Aariz Khan', text: 'Afzaal is a fantastic developer. He brought our ideas to life with his work.' },
    { name: 'Meher Malik', text: 'Afzaal coding skills are impressive. He completed the project ahead of schedule.' },
    { name: 'Samiha Ali', text: 'I am very satisfied with Afzaal’s work. He was professional and dedicated.' },
    { name: 'Tariq Nazeer', text: 'Afzaal is talented and hardworking. He made our project successful.' },
  ];
  
const projects = [
    {
      title: 'Foody Zone',
      description: 'A food delivery web app with restaurant listings, real-time ordering, and personalized recommendations.',
      image: FoodyZone,
    },
    {
      title: 'Resume & CV',
      description: 'A web app to create, customize, and download professional resumes with modern templates',
      image: Resume,
    },
    {
      title: 'Ecommerce Website',
      description: 'A full-featured ecommerce platform with product listings, cart system, and secure checkout.',
      image: Ecommerce,
    },
    {
      title: 'Social MediaDash board',
      description: 'A analytics dashboard tracking engagement metrics across multiple social platforms in real-time.',
      image: SocialMediaDashboard,
    },
    {
      title: 'Chat bot ',
      description: 'An AI-powered chat bot that provides instant responses and learns from user interactions.',
      image: Chatbot,
    },
    
    {
      title: 'funs Game',
      description: 'A collection of addictive mini-games with leaderboards and social sharing.',
      image: Funsgame,
    },
    
  ];
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: (
      <button className="prev-arrow absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none">
        ←
      </button>
    ),
    nextArrow: (
      <button className="next-arrow absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none">
        →
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          prevArrow: (
            <button className="prev-arrow absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none">
              ←
            </button>
          ),
          nextArrow: (
            <button className="next-arrow absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none">
              →
            </button>
          )
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          prevArrow: (
            <button className="prev-arrow absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none">
              ←
            </button>
          ),
          nextArrow: (
            <button className="next-arrow absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none">
              →
            </button>
          )
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: (
            <button className="prev-arrow absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none">
              ←
            </button>
          ),
          nextArrow: (
            <button className="next-arrow absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none">
              →
            </button>
          )
        }
      }
    ]
  };
  

  return (
    <div className="home bg-white relative">
  {showSkills&&( 
      <section className="skills-section py-20 text-black">
  <h2 className="text-5xl font-bold text-center mb-10">Skills</h2>
  <div className="container mx-auto px-8">
    <div className="flex flex-wrap justify-center">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="skill-card bg-white text-black p-6 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-900 to-blue-500 shadow-xl transition-shadow duration-300 relative overflow-hidden hover:text-white flex flex-col items-center m-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <img src={skill.icon} alt={skill.name} className="w-20 h-20 mb-4" />
          <p className="text-xl font-medium">{skill.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>
)}
{showExperience&&(
<section className="experience-section py-20 text-black">
  <h2 className="text-5xl font-bold text-center mb-10">Experience</h2>
  <div className="container mx-auto px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {experience.map((job, index) => (
        <div
          key={index}
          className="experience-card raining-effect bg-white text-black p-6 rounded-md shadow-lg 
          hover:bg-gradient-to-r from-blue-900 to-blue-500 shadow-xl transition-all duration-300 
          relative overflow-hidden hover:text-white"
        >
          <h3 className="text-xl font-semibold">{job.title} - {job.company}</h3>
          <p className="text-xl">{job.duration} | {job.location}</p>
          {job.description.map((desc, idx) => {
            // Split the heading from the description text
            const [heading, ...rest] = desc.split(': ');
            return (
              <p key={idx} className="text-lg mt-2 text-left p-2">
                <strong className="">{heading}:</strong> {rest.join(': ')}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  </div>
</section>

)}


      {/* Project Section */}
      {showProjects && (
  <section className="projects-section py-20 bg-gray-100">
    <h2 className="text-5xl font-bold text-center mb-10 text-blue-700">Featured Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
      {projects.map((project, index) => (
        <div
          key={index}
          className="project-card bg-white text-black p-6 rounded-md shadow-lg hover:bg-gradient-to-r from-blue-900 to-blue-500 shadow-xl transition-shadow relative overflow-hidden hover:text-white"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover mb-4 rounded-md"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }} // Add shadow to the image
          />
          <h3 className="text-xl font-semibold mb-2 ">{project.title}</h3>
          <p>{project.description}</p>
          <svg
            className="absolute top-0 left-0 w-16 h-16 text-blue-500 opacity-30" // Example SVG added for color
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        </div>
      ))}
    </div>
  </section>
)}




      {/* Testimonials Section */}
      {showTestimonials && (
  <section className="testimonials-section py-16 bg-gray-50 overflow-hidden">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
      Testimonials
    </h2>
    <div className="max-w-5xl mx-auto">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-4">
            <div className="testimonial-card bg-white text-black p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-blue-700 to-blue-500 hover:text-white">
              <p className="text-lg mb-4 italic leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
              <h4 className="text-2xl font-semibold mt-4">
                {testimonial.name}
              </h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </section>
)}

{showContact&&(
    <section className="contact-us-section py-20 bg-white text-black">
        <h2 className="text-5xl font-bold text-center mb-10">Contact Us</h2>
        <div className="container mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          

          {/* Contact Info Card */}
          <div className="contact-card bg-white text-black p-6 rounded-md shadow-lg transition-all duration-300 hover:bg-gradient-to-r from-blue-900 to-blue-500 hover:text-white shadow-xl text-left group">
  <h3 className="text-xl font-semibold mb-6 text-center transition duration-300 hover:text-white">Get in Touch</h3>
  <p className="mb-6 text-lg">
    <strong className="font-medium">Phone:</strong>
    <a
      href="tel:+923424627671"
      className="text-blue-700 transition duration-300 ml-2 group-hover:text-white hover:underline"
    >
      +923044621015
    </a>
  </p>
  <p className="mb-6 text-lg">
    <strong className="font-medium">Email:</strong>
    <a
      href="mailto:afzaalshazada@gmail.com"
      className="text-blue-700 transition duration-300 ml-2 group-hover:text-white hover:underline"
    >
      afzaalshazada@gamil.com
    </a>
  </p>
  <p className="mb-6 text-lg">
    <strong className="font-medium">Skype:</strong>
    <a
      href="skype:live:.cid.47bcdb44a5769124"
      className="text-blue-700 transition duration-300 ml-2 group-hover:text-white hover:underline"
    >
      live:.cid.e5edb6d65194152b
    </a>
  </p>
</div>






          {/* Contact Form Card */}

          <div className="contact-card bg-white text-black p-6 rounded-md shadow-lg transition-all duration-300 text-left">
            <h3 className="text-xl font-semibold mb-4 text-center">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
             
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input type="text" id="senderName"
              name="senderName"
              value={formData.senderName} onChange={handleInputChange} required className="border border-gray-300 rounded-md w-full p-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input type="email" id="senderEmail"
              name="senderEmail"
              value={formData.senderEmail} onChange={handleInputChange} required className="border border-gray-300 rounded-md w-full p-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">Message</label>
                <textarea  id="message"
              name="message"
              value={formData.message}onChange={handleInputChange} rows="4" required className="border border-gray-300 rounded-md w-full p-2"></textarea>
              </div>
              <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submissionStatus && (
            <p className={`mt-4 text-center ${submissionStatus.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
              {submissionStatus}
            </p>
          )}
              
            </form>
          </div>
        </div>
        </section>

)}
      </div>
  );
};

export default AllComponents;
