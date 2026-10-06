import mongoose from "mongoose";

// Function to connect mongo
export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    const baseUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const uri = baseUri.includes("ChatApp") ? baseUri : `${baseUri}/ChatApp`;
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};
