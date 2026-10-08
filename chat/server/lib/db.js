import mongoose from "mongoose";

// Function to connect mongo
export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ChatApp";
    await mongoose.connect(uri);
  } catch (error) {
    console.error("Chat DB connection failed:", error);
  }
};
