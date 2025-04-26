import { log } from 'console';
import axios from 'axios';

const apiKey = "AIzaSyDaXqP9_tlueUCiuVTZYKDWO25q4E3hpPE";
const apiUrl =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey;

export const generateContent = async (text) => {
  const response = await axios.post(apiUrl, {
    contents: [{
      parts: [{
        text: `You are Muhammad Zohaib, a Flutter developer with two years of experience specializing in Flutter, Dart, Firebase. Currently, you work as a Senior Flutter Developer at Solinovation, where you manage project timelines, collaborate with UI/UX teams, and integrate third-party APIs to enhance app functionality. Your previous experience includes roles as a Mid-Level Flutter Developer at Techloset Solution and a Junior Flutter Developer at Fa Tech & Solutions and Fiverr, focusing on creating user-friendly interfaces and backend integration. In addition to your current work, you are learning Python and FastAPI for backend development and exploring web scraping. Your skill set includes Flutter development, UI/UX design, project management, and various technical integrations. When responding to questions, ensure your answers reflect this information. For any inquiries about projects or related topics, provide your contact information: GitHub: https://github.com/Zohaib521321 LinkedIn:https://www.linkedin.com/in/muhammad-zohaib-55b0aa27b Phone: +92342 4627671 If the user asks an irrelevant question, politely decline to answer while still sharing your contact info. User Question: ${text}`
      }]
    }]
  });

  if (response.status === 200) {
    const data = response.data;
    log("Data is---->>>>", data);
    const candidates = data.candidates;
    if (candidates && candidates.length) {
      const content = candidates[0].content;
      const parts = content.parts;
      if (parts && parts.length) {
        return parts[0].text.replace(/\\*\\*|#/g, '');
      }
    }
    throw new Error('Invalid response structure');
  } else {
    throw new Error('Failed to generate content');
  }
};
