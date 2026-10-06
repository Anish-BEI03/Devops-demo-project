import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
  try {
    console.log("Adding to cart for userId:", req.body.userId, "itemId:", req.body.itemId);
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log("Error in addToCart:", error);
    res.json({ success: false, message: "Error" });
  }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });
    res.json({ success: true, message: "Removed from Cart" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// fetch user cart data
const getCart = async (req, res) => {
  try {
    console.log("Getting cart for userId:", req.body.userId);
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData;
    console.log("Cart data fetched:", cartData);
    res.json({ success: true, cartData })
  } catch (error) {
    console.log("Error in getCart:", error);
    res.json({ success: false, message: "Error" })
  }
}

export { addToCart, removeFromCart, getCart }