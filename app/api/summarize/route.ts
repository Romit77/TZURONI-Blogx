import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Summarize the following text: ${content}`
    );

    if (!result || !result.response || !result.response.text) {
      throw new Error("Failed to summarize post");
    }

    return NextResponse.json({ summary: result.response.text });
  } catch (error) {
    console.error("Failed to summarize post:", error);
    return NextResponse.json(
      { error: "Failed to summarize post" },
      { status: 500 }
    );
  }
}
