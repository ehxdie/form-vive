"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/feedback/:id", async (req, res) => {
    try {
        const feedback = await prisma.feedback.findUnique({
            where: { id: req.params.id },
        });
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.json(feedback);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
