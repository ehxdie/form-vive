import express from "express";
import { PrismaClient } from "@prisma/client";
import { pickRandomPersona } from "../../utils/pickPersona";
import { buildPrompt, openai } from "../../integrations/openAi";
import debugLib from "debug";

const debug = debugLib("form-vive:feedback");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/feedback", async (req: any, res: any) => {
    try {
        
        const { productName, problem, audience } = req.body;
        debug("Received POST /feedback with body: %O", req.body);

        if (!productName || !problem || !audience) {
            debug("Missing fields in request body");
            return res.status(400).json({ error: "Missing fields" });
        }

        const persona = pickRandomPersona();
        

        const aiPrompt = buildPrompt(productName, problem, audience, persona);
        

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: aiPrompt }],
            temperature: 0.8,
        });

        const response = completion.choices[0].message?.content || "No response generated.";
        debug("AI response: %s", response);

        
        const entry = await prisma.feedback.create({
            data: {
                productName,
                problem,
                audience,
                response: response,
                persona,
            },
        });

        debug("Saved feedback entry: %O", entry);

        res.status(201).json({ response: entry.response, persona: entry.persona });

    } catch (error) {
        debug("Error in POST /feedback: %O", error);
        res.status(500).json({ error: "Server error.." });
    }
});

export default router;