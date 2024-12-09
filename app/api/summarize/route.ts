import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not defined" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // More explicit prompt and error handling
    const prompt = `
      You are an expert summarizer. Provide a clear, concise summary of the following text.
      Ensure the summary captures the main points and key ideas.
      Text to summarize:
      ${content}
    `;

    try {
      const result = await model.generateContent(prompt);

      // Log the entire result object for debugging
      console.log("Full Gemini API Result:", JSON.stringify(result, null, 2));

      // Try multiple ways of extracting the text
      const summary =
        result.response?.text() ||
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "";

      console.log("Extracted Summary:", summary);

      if (!summary) {
        return NextResponse.json(
          { error: "No summary could be generated" },
          { status: 500 }
        );
      }

      return NextResponse.json({ summary });
    } catch (apiError) {
      console.error("Gemini API Error:", apiError);
      return NextResponse.json(
        {
          error: `Gemini API Error: ${
            apiError instanceof Error ? apiError.message : "Unknown error"
          }`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request Processing Error:", error);
    return NextResponse.json(
      {
        error: `Request Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
