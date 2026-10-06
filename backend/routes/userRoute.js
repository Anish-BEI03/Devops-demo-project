import express from 'express';
import { loginUser, registerUser, getUserProfile, updateUserProfile, changePassword, requestPasswordChangeCode, verifyPasswordChangeCode, changePasswordWithCode, requestForgotPasswordCode, resetPasswordWithCode, verifyForgotPasswordCode } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/profile', authMiddleware, getUserProfile);
userRouter.post('/update-profile', authMiddleware, updateUserProfile);
userRouter.post('/change-password', authMiddleware, changePassword);

// Verification code routes
userRouter.post('/request-password-change-code', authMiddleware, requestPasswordChangeCode);
userRouter.post('/verify-password-change-code', authMiddleware, verifyPasswordChangeCode);
userRouter.post('/change-password-with-code', authMiddleware, changePasswordWithCode);
userRouter.post('/request-forgot-password-code', requestForgotPasswordCode);
userRouter.post('/verify-forgot-password-code', verifyForgotPasswordCode);
userRouter.post('/reset-password-with-code', resetPasswordWithCode);

export default userRouter;