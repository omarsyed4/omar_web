// openai.js

import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: 'your-openai-api-key', // Replace with your OpenAI API key
});

// Function to generate a response using OpenAI API
export async function generateOpenAIResponse(conversation) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or whichever model you prefer
      messages: conversation,
      temperature: 0.7, // You can adjust temperature for more/less randomness
    });

    // Return the text from the response
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating OpenAI response:', error);
    return "Sorry, I couldn't process that right now.";
  }
}
