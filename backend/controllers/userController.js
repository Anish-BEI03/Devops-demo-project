import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { sendWelcomeEmail, sendVerificationCodeEmail } from "../utils/emailService.js";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" })
    }

    const token = createToken(user._id);
    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    console.log('Registering user:', { name, email, password: password ? 'provided' : 'missing' });
    // checking is user already exists
    const exists = await UserModel.findOne({ email });
    if (exists) {
      console.log('User already exists');
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email
    if (!validator.isEmail(email)) {
      console.log('Invalid email');
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      console.log('Password too short');
      return res.json({
        success: false,
        message: "Pleasee enter a strong password",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log('User saved:', user._id);
    const token = createToken(user._id);
    console.log('Token created');

    // Send welcome email
    await sendWelcomeEmail(email, name);

    res.json({ success: true, token });

  } catch (error) {
    console.log('Registration error:', error);
    res.json({ success: false, message: "Registeration failed" });
  }
};

// get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching profile" });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, email } = req.body;

    // Validate inputs
    if (!name || !email) {
      return res.json({ success: false, message: "Name and email are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if email is already in use by another user
    if (email !== user.email) {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        return res.json({ success: false, message: "Email already in use" });
      }
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating profile" });
  }
};

// change password
const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Validate inputs
    if (!currentPassword || !newPassword) {
      return res.json({ success: false, message: "Current and new password are required" });
    }

    if (newPassword.length < 8) {
      return res.json({ success: false, message: "New password must be at least 8 characters" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error changing password" });
  }
};

// Generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request password change verification code
const requestPasswordChangeCode = async (req, res) => {
  try {
    const { currentPassword } = req.body;
    const userId = req.body.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Verify current password
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Current password is incorrect" });
    }

    const verificationCode = generateVerificationCode();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = expiryTime;
    user.verificationPurpose = 'password-change';
    await user.save();

    // Send email with verification code
    await sendVerificationCodeEmail(user.email, user.name, verificationCode, 'password-change');

    res.json({ success: true, message: "Verification code sent to your email" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error requesting verification code" });
  }
};

// Verify code for password change
const verifyPasswordChangeCode = async (req, res) => {
  try {
    const { userId, verificationCode } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.verificationCode || user.verificationCode !== verificationCode) {
      return res.json({ success: false, message: "Invalid verification code" });
    }

    if (new Date() > user.verificationCodeExpiry) {
      return res.json({ success: false, message: "Verification code expired" });
    }

    res.json({ success: true, message: "Code verified successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying code" });
  }
};

// Change password with verified code
const changePasswordWithCode = async (req, res) => {
  try {
    const { userId, verificationCode, newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.json({ success: false, message: "Invalid verification code" });
    }

    if (new Date() > user.verificationCodeExpiry) {
      return res.json({ success: false, message: "Verification code expired" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.verificationCode = null;
    user.verificationCodeExpiry = null;
    user.verificationPurpose = null;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error changing password" });
  }
};

// Forgot password - request code
const requestForgotPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const verificationCode = generateVerificationCode();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = expiryTime;
    user.verificationPurpose = 'forgot-password';
    await user.save();

    // Send email with verification code
    await sendVerificationCodeEmail(user.email, user.name, verificationCode, 'forgot-password');

    res.json({ success: true, message: "Verification code sent to your email" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error requesting verification code" });
  }
};

// Reset password with verification code (forgot password)
const resetPasswordWithCode = async (req, res) => {
  try {
    const { email, verificationCode, newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.json({ success: false, message: "Invalid verification code" });
    }

    if (new Date() > user.verificationCodeExpiry) {
      return res.json({ success: false, message: "Verification code expired" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.verificationCode = null;
    user.verificationCodeExpiry = null;
    user.verificationPurpose = null;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error resetting password" });
  }
};

// Verify forgot password code (without authentication)
const verifyForgotPasswordCode = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.json({ success: false, message: "Email and code are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.verificationCode || user.verificationCode !== verificationCode) {
      return res.json({ success: false, message: "Invalid verification code" });
    }

    if (new Date() > user.verificationCodeExpiry) {
      return res.json({ success: false, message: "Verification code expired" });
    }

    res.json({ success: true, message: "Code verified successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying code" });
  }
};

export { loginUser, registerUser, getUserProfile, updateUserProfile, changePassword, requestPasswordChangeCode, verifyPasswordChangeCode, changePasswordWithCode, requestForgotPasswordCode, resetPasswordWithCode, verifyForgotPasswordCode };
