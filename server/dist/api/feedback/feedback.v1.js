"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const pickPersona_1 = require("../../utils/pickPersona");
const openAi_1 = require("../../integrations/openAi");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// POST /feedback - Create feedback and return response + persona
router.post("/feedback", async (req, res) => {
    var _a;
    try {
        const { productName, problem, audience } = req.body;
        if (!productName || !problem || !audience) {
            return res.status(400).json({ error: "Missing fields" });
        }
        // Choose a persona randomly
        const persona = (0, pickPersona_1.pickRandomPersona)();
        const aiPrompt = (0, openAi_1.buildPrompt)(productName, problem, audience, persona);
        const completion = await openAi_1.openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or "gpt-4" if enabled
            messages: [{ role: "user", content: aiPrompt }],
            temperature: 0.8,
        });
        const response = ((_a = completion.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || "No response generated.";
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
    }
    catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
