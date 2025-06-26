"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedback_v1_1 = __importDefault(require("./api/feedback/feedback.v1"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
dotenv_1.default.config();
const debug = (0, debug_1.default)("form-vive:server");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api", feedback_v1_1.default);
// Health check
app.get("/", (_req, res) => {
    debug("Health check endpoint hit");
    res.send("API is running");
});
// Start server
app.listen(PORT, () => {
    debug(`Server listening on port ${PORT}`);
    console.log(`Server listening on port ${PORT}`);
});
