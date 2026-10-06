import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const feedbackModel = mongoose.models.feedback || mongoose.model("feedback", feedbackSchema);

export default feedbackModel;
