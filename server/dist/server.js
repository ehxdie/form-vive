"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const input_v1_1 = __importDefault(require("./api/input/input.v1"));
const feedback_v1_1 = __importDefault(require("./api/feedback/feedback.v1"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api", input_v1_1.default);
app.use("/api", feedback_v1_1.default);
// Health check
app.get("/", (_req, res) => {
    res.send("API is running");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
