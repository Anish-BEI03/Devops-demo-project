import express from "express";
import { submitFeedback, getAllFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

// Submit feedback
feedbackRouter.post("/add", submitFeedback);

// Get all feedback (optional)
feedbackRouter.get("/list", getAllFeedback);

export default feedbackRouter;
