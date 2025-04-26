import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profileImage from "../images/profile.png";
import AllComponents from "./allComponents";
const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    // Create two text elements to achieve seamless scrolling
    const originalText = textRef.current; // Your original text element
    const cloneText = originalText.cloneNode(true); // Clone the original text element

    // Append the cloned element to the same parent
    originalText.parentNode.appendChild(cloneText);

    // Set initial positions for both text elements
    gsap.set(originalText, { x: "20%" });
    gsap.set(cloneText, { x: "100%" }); // Start clone just off the screen to the right

    // Create a timeline for the animation
    const tl = gsap.timeline({ repeat: -1 });

    // Animate the original text moving out of view
    tl.to(originalText, {
      x: "-150%", // Move the original text to the left
      duration: 30,
      ease: "linear",
    });

    // Animate the cloned text moving into view
    tl.to(
      cloneText,
      {
        x: "-150%", // Move the cloned text to the left
        duration: 30,
        ease: "linear",
      },
      0
    ); // Start at the same time as the original text

    // Reset the position of the original text when it finishes
    tl.set(originalText, { x: "100%" }, "+=0"); // Reset immediately after finishing
    tl.set(cloneText, { x: "100%" }, "+=0"); // Reset immediately after finishing

    if (isLoaded) {
      // Button Hover Effects
      const buttons = document.querySelectorAll(".raining-effect");
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
          createRainEffect(button);
          applyParallaxEffect(button);
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
          removeRainEffect(button);
          removeParallaxEffect(button);
        });
      });

      // Card Hover Effects
      const cards = document.querySelectorAll(
        ".project-card, .skill-card, .testimonial-card"
      );
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            backgroundColor: "#38bdf8",
            duration: 0.5,
            ease: "power2.out",
          }); // Sky blue color
          createRainEffect(card);
          applyParallaxEffect(card);
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            backgroundColor: "#ffffff",
            duration: 0.5,
            ease: "power2.out",
          });
          removeRainEffect(card);
          removeParallaxEffect(card);
        });
      });
    }
  }, [isLoaded]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const createRainEffect = (element) => {
    const rainContainer = document.createElement("div");
    rainContainer.classList.add(
      "rain-container",
      "absolute",
      "inset-0",
      "overflow-hidden",
      "pointer-events-none"
    );

    for (let i = 0; i < 40; i++) {
      const drop = document.createElement("div");
      drop.classList.add(
        "rain-drop",
        "bg-gradient-to-b",
        "from-blue-200",
        "to-blue-500",
        "absolute",
        "w-1",
        "h-4",
        "rounded-full",
        "opacity-50"
      );
      gsap.set(drop, {
        x: gsap.utils.random(0, element.offsetWidth),
        y: gsap.utils.random(-element.offsetHeight, -10),
        scale: gsap.utils.random(0.5, 1.5),
      });
      rainContainer.appendChild(drop);
    }
    element.appendChild(rainContainer);
    gsap.to(rainContainer.children, {
      y: element.offsetHeight,
      duration: 1,
      stagger: 0.1,
      repeat: -1,
      ease: "power2.in",
    });
  };

  const removeRainEffect = (element) => {
    const rainContainer = element.querySelector(".rain-container");
    if (rainContainer) {
      gsap.killTweensOf(rainContainer.children);
      rainContainer.remove();
    }
  };

  const applyParallaxEffect = (element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xOffset = (x / element.offsetWidth - 0.5) * 10;
      const yOffset = (y / element.offsetHeight - 0.5) * 10;

      gsap.to(element, {
        x: xOffset,
        y: yOffset,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  const removeParallaxEffect = (element) => {
    element.removeEventListener("mousemove", () => {});
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div className="home bg-white relative">
      {/* Hero Section */}
      <section className="hero-section text-center py-20 text-black relative">
        <img
          src={profileImage}
          alt="Profile"
          className={`w-48 h-48 rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-xl transition-transform ${
            isLoaded ? "" : "blur-md"
          }`}
          onLoad={handleImageLoad}
        />

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Hi, I'm Afzaal Shoukat
        </h1>

        <p className="text-2xl mb-4 italic font-semibold text-gray-700">
          Full Stack Developer | C++ & Python Expert | React & Next.js
          Specialist
        </p>

        <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed opacity-90 tracking-wide">
          Passionate Full Stack Developer building high-performance web apps.
          Expert in React, Next.js, Python & C++ for scalable solutions. Let's
          collaborate and turn ideas into reality with clean, efficient code!
        </p>

        <div className="overflow-hidden whitespace-nowrap">
          <div className="w-full inline-block">
            <div ref={textRef} className="inline-block text-2xl font-bold">
              JavaScript | React | Python | Firebase | FastAPI | MongoDB | AI
              Integration | UI/UX | Animation Map Integration | Performance
              Optimization | Animation &nbsp;
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8 px-4 sm:px-6 lg:px-8">
          <a
            href="/projects"
            className="relative bg-gradient-to-r from-blue-900 to-blue-500 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg shadow-lg raining-effect overflow-hidden"
          >
            View My Work
          </a>

          <a
            href="/contact"
            className="relative border border-gradient-to-r from-blue-900 to-blue-500 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg shadow-lg raining-effect overflow-hidden text-blue-900"
          >
            Contact Me
          </a>
        </div>
      </section>
      <AllComponents
        showSkills={true}
        showExperience={true}
        showProjects={true}
        showTestimonials={true}
      />
    </div>
  );
};

export default Home;
