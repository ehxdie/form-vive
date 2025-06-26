import express from "express";
import { PrismaClient } from "@prisma/client";
import { pickRandomPersona } from "../../utils/pickPersona";
import { buildPrompt,openai } from "../../integrations/openAi";

const router = express.Router();
const prisma = new PrismaClient();

// POST /feedback - Create feedback and return response + persona
router.post("/feedback", async (req: any, res: any) => {
    try {
        const { productName, problem, audience } = req.body;

        if (!productName || !problem || !audience) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Choose a persona randomly
        const persona = pickRandomPersona();

        const aiPrompt = buildPrompt(productName, problem, audience, persona);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or "gpt-4" if enabled
            messages: [{ role: "user", content: aiPrompt }],
            temperature: 0.8,
        });

        const response = completion.choices[0].message?.content || "No response generated.";

        // Save to DB
        const entry = await prisma.feedback.create({
            data: {
                productName,
                problem,
                audience,
                response: response,
                persona,
            },
        });

        // Respond with feedback and persona
        res.status(201).json({ response: entry.response, persona: entry.persona });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;