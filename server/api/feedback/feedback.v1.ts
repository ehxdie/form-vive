import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/feedback/:id", async (req, res) => {
    try {
        const feedback = await prisma.feedback.findUnique({
            where: { id: req.params.id },
        });

        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
