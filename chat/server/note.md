## Hence a lib folder not committing into the git, you have to follow these steps to run the Chat feature

## Make a new folder named ( lib ) in the server folder and create 3 files named,

# cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

# db.js
import mongoose from "mongoose";

// Funtion to connect mongo
export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}/ChatApp`)
  } catch (error) {
    console.log(error);
  }
}

# utils.js
import jwt from "jsonwebtoken";

// function to generate a token for a user
export const generateToken = (userId)=>{
  const token = jwt.sign({userId}, process.env.JWT_SECRET);
  return token;
}

### And make a .env file in the server folder and paste this,

MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.example.mongodb.net"
PORT=5001
JWT_SECRET="your_jwt_secret_key_change_this"

CLOUDINARY_CLOUD_NAME='your_cloud_name'
CLOUDINARY_API_KEY='your_api_key'
CLOUDINARY_API_SECRET='your_api_secret'