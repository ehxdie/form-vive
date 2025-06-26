"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const pickPersona_1 = require("../../utils/pickPersona");
const openAi_1 = require("../../integrations/openAi");
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("form-vive:feedback");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/feedback", async (req, res) => {
    var _a;
    try {
        const { productName, problem, audience } = req.body;
        debug("Received POST /feedback with body: %O", req.body);
        if (!productName || !problem || !audience) {
            debug("Missing fields in request body");
            return res.status(400).json({ error: "Missing fields" });
        }
        const persona = (0, pickPersona_1.pickRandomPersona)();
        debug("Picked persona: %s", persona);
        const aiPrompt = (0, openAi_1.buildPrompt)(productName, problem, audience, persona);
        debug("Built AI prompt: %s", aiPrompt);
        const completion = await openAi_1.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: aiPrompt }],
            temperature: 0.8,
        });
        const response = ((_a = completion.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || "No response generated.";
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
    }
    catch (error) {
        debug("Error in POST /feedback: %O", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
