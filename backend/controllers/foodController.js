import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req, res) => {

  if (!req.file) {
    return res.json({ success: false, message: "Image file is required" });
  }

  let image_filename = `${req.file.filename}`

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    Image: image_filename,
    showOnHome: req.body.showOnHome === 'true' || req.body.showOnHome === true
  })
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id)
    fs.unlink(`uploads/${food.Image}`, () => { })
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// update food item
const updateFood = async (req, res) => {
  try {
    const foodId = req.body.id;
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Update the food data
    food.name = req.body.name || food.name;
    food.description = req.body.description || food.description;
    food.price = req.body.price || food.price;
    food.category = req.body.category || food.category;
    if (req.body.showOnHome !== undefined) {
      food.showOnHome = req.body.showOnHome === 'true' || req.body.showOnHome === true;
    }

    // If a new image is uploaded, update it
    if (req.file) {
      // Delete old image
      fs.unlink(`uploads/${food.Image}`, () => { });
      food.Image = req.file.filename;
    }

    await food.save();
    res.json({ success: true, message: "Food Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { addFood, listFood, removeFood, updateFood } 