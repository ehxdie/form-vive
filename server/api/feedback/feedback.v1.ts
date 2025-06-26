import express from "express";
import { PrismaClient } from "@prisma/client";
import { generateMockFeedback } from "../../utils/generateMockFeedback";
import { pickRandomPersona } from "../../utils/pickPersona";

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

        // Generate mock feedback
        const feedback = generateMockFeedback(productName, problem, persona);

        // Save to DB
        const entry = await prisma.feedback.create({
            data: {
                productName,
                problem,
                audience,
                response: feedback,
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