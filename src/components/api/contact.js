import { BASE_URL } from "../../constant";
const URL = BASE_URL+'api/contact';

export const sendEmail = async (name, email, message) => {
  try {
    const response = await fetch(`${URL}/sendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
      },
      body: JSON.stringify({
        "senderName": name,
        "senderEmail": email,
        "message": message,
      }),
    });
    console.log("Email is +"+email)
    console.log("Name is "+name)

    if (!response.ok) {
      const errorDetail = await response.text();
      console.error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorDetail}`);
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      console.error('Network error: The request could not be completed.');
    } else {
      console.error('Error occurred:', error.message);
    }
    throw error;
  }
};
