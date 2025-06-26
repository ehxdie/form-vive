import { OpenAI } from "openai";
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const buildPrompt = (productName: string, problem: string, audience: string, persona: string): string => {
    return `
  You are a ${persona} user of a new product.
  
  Product: ${productName}
  Problem it solves: ${problem}
  Target audience: ${audience}
  
  Write a short, paragraph-style review of the product from the perspective of a ${persona} user.
  `;
  }