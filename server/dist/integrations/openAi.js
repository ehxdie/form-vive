"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrompt = exports.openai = void 0;
const openai_1 = require("openai");
exports.openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const buildPrompt = (productName, problem, audience, persona) => {
    return `
  You are a ${persona} user of a new product.
  
  Product: ${productName}
  Problem it solves: ${problem}
  Target audience: ${audience}
  
  Write a short, paragraph-style review of the product from the perspective of a ${persona} user.
  `;
};
exports.buildPrompt = buildPrompt;
