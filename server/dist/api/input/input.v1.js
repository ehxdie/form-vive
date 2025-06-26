"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
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
    }
    catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Server error" });
    }
});
function pickRandomPersona() {
    const personas = ["enthusiastic", "skeptical", "professional"];
    const index = Math.floor(Math.random() * personas.length);
    return personas[index];
}
function generateMockFeedback(name, problem, persona) {
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
exports.default = router;
