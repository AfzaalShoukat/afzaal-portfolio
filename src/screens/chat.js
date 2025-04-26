// src/components/ChatForm.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import ReactMarkdown from 'react-markdown'; 

const ChatForm = ({ onClose }) => {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef(null);

  const apiKey = "AIzaSyDaXqP9_tlueUCiuVTZYKDWO25q4E3hpPE";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!question) {
      setError('Please enter a question.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        contents: [
          {
            parts: [
              {
                text: `You are Afzaal Shoukat, a Full Stack Developer with two years of experience specializing in React, Next.js, and Python. Currently, you work as a Senior Developer at Solinovation, where you manage project timelines, collaborate with UI/UX teams, and integrate third-party APIs to enhance application functionality. Your previous experience includes roles as a Mid-Level Developer at Techloset Solution and a Junior Developer at FA Tech & Solutions and Fiverr, focusing on creating responsive interfaces and backend systems.

In addition to your current work, you are expanding your expertise in C++ for system programming and advanced Python techniques. Your skill set includes React/Next.js development, UI/UX design, project management, and full-stack integrations.

When responding to questions, ensure your answers reflect this information. For inquiries about projects or related topics, provide your contact information:

- GitHub: [  Explore My Github](https://github.com/AfzaalShoukat)
- LinkedIn: [ Connect with Me on LinkedIn](https://www.linkedin.com/in/AfzaalShoukat)
- WhatsApp: [Message Me on WhatsApp](https://wa.me/923044621015)


If the user asks an irrelevant question, politely decline to answer while still sharing your contact info. Thank you!
 Question: ${question}`
              }
            ]
          }
        ]
      });

      const text = response.data.candidates[0].content.parts[0].text;
      setResponses((prev) => [...prev, { type: 'user', text: question }, { type: 'bot', text }]);
      setQuestion(''); // Clear the input after submission
    } catch (err) {
      setError('Failed to generate content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      // GSAP loading animation
      gsap.to('.loading-spinner', {
        rotation: 360,
        repeat: -1,
        duration: 1,
        ease: "none",
      });
    }

    // Scroll to the bottom of the chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [loading, responses]);

  return (
    <div className="fixed bottom-0 right-0 p-4 w-full max-w-sm">
      <div
        className=" shadow-lg rounded-lg h-[75vh] flex flex-col"
        style={{ backgroundColor: 'rgba(174, 194, 224, 0.1)' }} // Apply the background color here
      >
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          ref={chatContainerRef}
        >
          <h2 className="text-xl font-bold text-gold text-center mb-2">🌩️ Afzaal Chatbot 🌨️</h2>
          {responses.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg text-left ${msg.type === 'user' ? 'bg-blue-300 text-white self-end' : 'bg-white text-gray-800 self-start'}`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown> {/* Render markdown */}
            </div>
          ))}
          {loading && (
            <div className="loading-spinner flex justify-center items-center mt-4">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-4">
  {error && <p className="text-red-500 mb-2">{error}</p>}
  <div className="flex">
    <textarea
      className="border border-blue-300 rounded-lg p-2 w-full h-16 resize-none focus:outline-none focus:ring focus:ring-blue-500"
      placeholder="Ask me anything..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
    <button
      type="submit"
      className={`bg-gradient-to-r from-blue-900 to-blue-500 text-white p-2 rounded-lg ml-2 shadow-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? '...' : 'Send'}
    </button>
  </div>
  
  <button
    className="mt-2 bg-gradient-to-r from-red-500 to-red-400 text-white p-2 rounded-lg hover:bg-red-300 transition duration-300 mx-4"
    onClick={onClose}
  >
    ❌ Close
  </button>
</form>

      </div>
    </div>
  );
};

export default ChatForm;
