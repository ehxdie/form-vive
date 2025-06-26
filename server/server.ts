import express from "express";
import feedbackRouter from "./api/feedback/feedback.v1";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api", feedbackRouter);

// Health check
app.get("/", (_req, res) => {
    res.send("API is running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});