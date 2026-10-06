import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
  userId: { type: String, required: true }, // Can be user ID or email for anonymous ratings
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
})

const ratingModel = mongoose.models.rating || mongoose.model("rating", ratingSchema);

export default ratingModel;
