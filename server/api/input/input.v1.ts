import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/feedback/input", async (req, res) => {
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

        res.status(201).json({ id: entry.id });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Server error" });
    }
});

function pickRandomPersona(): string {
    const personas = ["enthusiastic", "skeptical", "professional"];
    const index = Math.floor(Math.random() * personas.length);
    return personas[index];
}

function generateMockFeedback(name: string, problem: string, persona: string) {
    switch (persona) {
        case "skeptical":
            return `Not sure ${name} really solves "${problem}" effectively. Sounds ambitious.`;
        case "professional":
            return `From a business perspective, ${name} addresses "${problem}" with potential upside.`;
        case "enthusiastic":
        default:
            return `Wow! ${name} is perfect for solving "${problem}". I'm excited!`;
    }
}

export default router;
