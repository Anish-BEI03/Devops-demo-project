import express from "express";
import { addRating, getFoodRatings, getAverageRating } from "../controllers/ratingController.js";
import ratingModel from "../models/ratingModel.js";
import foodModel from "../models/foodModel.js";

const ratingRouter = express.Router();

// Get average rating and all ratings for a food item
ratingRouter.get("/list/:foodId", getFoodRatings);

// Add a new rating
ratingRouter.post("/add", addRating);

// Get just average rating (legacy)
ratingRouter.get("/average/:foodId", getAverageRating);

// Setup default ratings (run once)
ratingRouter.post("/setup/default-ratings", async (req, res) => {
  try {
    const foods = await foodModel.find({});

    if (foods.length === 0) {
      return res.json({
        success: false,
        message: "No foods found in database"
      });
    }

    const defaultRatingsData = [
      { rating: 5, userId: "user_default_1", comment: "Amazing food! Highly recommended" },
      { rating: 4, userId: "user_default_2", comment: "Very good quality" },
      { rating: 5, userId: "user_default_3", comment: "Excellent taste" },
      { rating: 3, userId: "user_default_4", comment: "Average, could be better" },
      { rating: 4, userId: "user_default_5", comment: "Good value for money" },
      { rating: 5, userId: "user_default_6", comment: "Love it!" },
      { rating: 2, userId: "user_default_7", comment: "Not what I expected" },
      { rating: 4, userId: "user_default_8", comment: "Pretty good" },
      { rating: 5, userId: "user_default_9", comment: "Perfect!" },
      { rating: 3, userId: "user_default_10", comment: "Decent option" }
    ];

    let totalRatingsAdded = 0;

    for (const food of foods) {
      // Delete existing default ratings for this food
      await ratingModel.deleteMany({
        foodId: food._id,
        userId: { $regex: "^user_default_" }
      });

      // Add new default ratings
      for (let i = 0; i < defaultRatingsData.length; i++) {
        const ratingData = defaultRatingsData[i];

        const newRating = new ratingModel({
          foodId: food._id,
          userId: ratingData.userId,
          rating: ratingData.rating,
          comment: ratingData.comment,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        });

        await newRating.save();
        totalRatingsAdded++;
      }
    }

    res.json({
      success: true,
      message: `Default ratings added successfully! Total: ${totalRatingsAdded}`,
      foodsCount: foods.length,
      ratingsPerFood: defaultRatingsData.length
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error setting up default ratings"
    });
  }
});

export default ratingRouter;
