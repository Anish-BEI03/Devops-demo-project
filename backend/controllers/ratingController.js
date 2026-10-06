import ratingModel from "../models/ratingModel.js";

// Get average rating for a food item
export const getAverageRating = async (req, res) => {
  try {
    const { foodId } = req.params;

    const ratings = await ratingModel.find({ foodId });

    if (ratings.length === 0) {
      return res.json({
        success: true,
        averageRating: 0,
        totalRatings: 0,
        data: []
      });
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = (totalRating / ratings.length).toFixed(1);

    res.json({
      success: true,
      averageRating: parseFloat(averageRating),
      totalRatings: ratings.length,
      data: ratings
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching ratings"
    });
  }
};

// Add a new rating
export const addRating = async (req, res) => {
  try {
    const { foodId, userId, rating, comment } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    // Check if user already rated this food
    const existingRating = await ratingModel.findOne({ foodId, userId });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.comment = comment || existingRating.comment;
      await existingRating.save();

      return res.json({
        success: true,
        message: "Rating updated successfully",
        data: existingRating
      });
    }

    // Create new rating
    const newRating = new ratingModel({
      foodId,
      userId,
      rating,
      comment
    });

    await newRating.save();

    res.json({
      success: true,
      message: "Rating added successfully",
      data: newRating
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error adding rating"
    });
  }
};

// Get all ratings with average for a food item
export const getFoodRatings = async (req, res) => {
  try {
    const { foodId } = req.params;

    const ratings = await ratingModel.find({ foodId }).sort({ createdAt: -1 });

    if (ratings.length === 0) {
      return res.json({
        success: true,
        averageRating: 0,
        totalRatings: 0,
        ratings: []
      });
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = (totalRating / ratings.length).toFixed(1);

    res.json({
      success: true,
      averageRating: parseFloat(averageRating),
      totalRatings: ratings.length,
      ratings
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching ratings"
    });
  }
};
