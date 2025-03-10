
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Helper function to generate content using Groq
export async function generateWithGroq(prompt, model = "llama3-70b-8192") {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: model,
      temperature: 0.5,
      max_tokens: 4096,
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating content with Groq:", error);
    throw new Error(`Groq API error: ${error.message}`);
  }
}

// Helper for JSON responses (parses response text as JSON)
export async function generateJsonWithGroq(prompt, model = "llama3-70b-8192") {
  const response = await generateWithGroq(prompt, model);
  
  // Clean the response (remove code blocks if present)
  const cleanedResponse = response.replace(/```(?:json)?\n?/g, "").trim();
  
  try {
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Error parsing JSON from Groq response:", error);
    throw new Error("Failed to parse JSON from Groq response");
  }
}