import feedbackModel from "../models/feedbackModel.js";

export const submitFeedback = async (req, res) => {
  try {
    const { email, feedback } = req.body;

    // Validate inputs
    if (!email || !feedback) {
      return res.json({
        success: false,
        message: "Email and feedback are required"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email"
      });
    }

    // Validate feedback length
    if (feedback.trim().length < 10) {
      return res.json({
        success: false,
        message: "Feedback should be at least 10 characters long"
      });
    }

    // Create new feedback
    const newFeedback = new feedbackModel({
      email,
      feedback: feedback.trim()
    });

    await newFeedback.save();

    res.json({
      success: true,
      message: "Thank you for your feedback!",
      data: newFeedback
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error submitting feedback"
    });
  }
};

// Optional: Get all feedback (for admin panel later)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: feedbacks,
      total: feedbacks.length
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching feedback"
    });
  }
};
