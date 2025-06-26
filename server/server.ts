import express from "express";
import feedbackRouter from "./api/feedback/feedback.v1";
import dotenv from "dotenv";
import cors from "cors";
import debugLib from "debug";

dotenv.config();

const debug = debugLib("form-vive:server");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api", feedbackRouter);

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