// Script to add default mixed ratings to all foods
// Run this once in MongoDB or via API

import ratingModel from "./models/ratingModel.js";
import foodModel from "./models/foodModel.js";

export const addDefaultRatings = async () => {
  try {
    // Get all foods
    const foods = await foodModel.find({});

    if (foods.length === 0) {
      console.log("No foods found in database");
      return;
    }

    // Define mixed ratings for variety
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

    // Add ratings to each food
    for (const food of foods) {
      // Delete existing default ratings
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
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date in last 30 days
        });

        await newRating.save();
      }

      console.log(`Added ratings for food: ${food.name}`);
    }

    console.log("Default ratings added successfully!");
  } catch (error) {
    console.error("Error adding default ratings:", error);
  }
};

// Alternative: Export for use in routes if needed
export default addDefaultRatings;
