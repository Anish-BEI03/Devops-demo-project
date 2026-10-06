import nodemailer from 'nodemailer';

// Function to get transporter - lazy load to ensure env variables are available
const getTransporter = () => {
  if (process.env.EMAIL_SERVICE === 'custom') {
    // For custom SMTP servers (Mailtrap, etc.)
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // true for 465, false for 2525
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // For Gmail and other services
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Food Delivery App!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 5px;">
            <h1>Welcome to Food Delivery!</h1>
          </div>
          <div style="padding: 20px; background-color: #f5f5f5;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for registering with us! We're excited to have you join our food delivery community.</p>
            <p>You can now:</p>
            <ul>
              <li>Browse our delicious menu</li>
              <li>Place orders and track delivery</li>
              <li>Chat with other users</li>
              <li>Manage your account</li>
            </ul>
            <p>If you have any questions, feel free to contact us.</p>
            <p>Happy ordering!</p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Best regards,<br>
              CityBites Delivery Team
            </p>
          </div>
        </div>
      `
    };

    await getTransporter().sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.log("Error sending welcome email:", error.message);
    return false;
  }
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (email, name, orderId, items, amount, address) => {
  try {
    const itemsList = items.map(item =>
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">x${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Rs.${item.price * item.quantity}</td>
      </tr>`
    ).join('');

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation - #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 5px;">
            <h1>Order Confirmed!</h1>
          </div>
          <div style="padding: 20px; background-color: #f5f5f5;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Your order has been successfully placed. Below are your order details:</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Order ID:</strong> #${orderId}</p>
              <p><strong>Status:</strong> Food Processing</p>
              
              <h3 style="color: #ff6b35;">Order Items:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f9f9f9;">
                    <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ff6b35;">Item</th>
                    <th style="padding: 8px; text-align: center; border-bottom: 2px solid #ff6b35;">Quantity</th>
                    <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ff6b35;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList}
                  <tr style="background-color: #f9f9f9;">
                    <td colspan="2" style="padding: 8px; text-align: right; font-weight: bold;">Delivery Charges:</td>
                    <td style="padding: 8px; text-align: right; font-weight: bold;">Rs.200</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px;">Total Amount:</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px; color: #ff6b35;">Rs.${amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #ff6b35;">Delivery Address:</h3>
              <p>
                ${address.firstName} ${address.lastName}<br>
                ${address.street}<br>
                ${address.city}, ${address.state} ${address.zipcode}<br>
                Phone: ${address.phone}
              </p>
            </div>

            <p>You can track your order status in your account dashboard.</p>
            <p>Thank you for your order!</p>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Best regards,<br>
              Food Delivery Team
            </p>
          </div>
        </div>
      `
    };

    await getTransporter().sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
    return true;
  } catch (error) {
    console.log("Error sending order confirmation email:", error.message);
    return false;
  }
};

// Send order status update email
export const sendOrderStatusEmail = async (email, name, orderId, status) => {
  try {
    const statusMessages = {
      "Food Processing": "Your food is being prepared with fresh ingredients.",
      "Out for delivery": "Your order is on the way! Our delivery partner will arrive soon.",
      "Delivered": "Your order has been delivered. Thank you for your purchase!",
      "Cancelled": "Your order has been cancelled."
    };

    const statusColor = status === "Delivered" ? "#28a745" : status === "Cancelled" ? "#dc3545" : "#ff6b35";

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Order Update - #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: ${statusColor}; color: white; padding: 20px; text-align: center; border-radius: 5px;">
            <h1>Order Status Update</h1>
          </div>
          <div style="padding: 20px; background-color: #f5f5f5;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Your order status has been updated:</p>
            
            <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
              <p style="font-size: 14px; color: #666;">Order ID: <strong>#${orderId}</strong></p>
              <p style="font-size: 24px; color: ${statusColor}; font-weight: bold; margin: 15px 0;">${status}</p>
              <p style="font-size: 14px; color: #666;">${statusMessages[status] || 'Your order status has changed.'}</p>
            </div>

            <p>You can check more details in your account dashboard.</p>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Best regards,<br>
              Food Delivery Team
            </p>
          </div>
        </div>
      `
    };

    await getTransporter().sendMail(mailOptions);
    console.log(`Order status email sent to ${email}`);
    return true;
  } catch (error) {
    console.log("Error sending order status email:", error.message);
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, name, resetToken) => {
  try {
    const resetLink = `http://localhost:5174/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 5px;">
            <h1>Password Reset</h1>
          </div>
          <div style="padding: 20px; background-color: #f5f5f5;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>

            <p style="color: #666; font-size: 12px;">
              If you didn't request this, please ignore this email. This link will expire in 1 hour.
            </p>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Best regards,<br>
              Food Delivery Team
            </p>
          </div>
        </div>
      `
    };

    await getTransporter().sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.log("Error sending password reset email:", error.message);
    return false;
  }
};

// Send verification code email
export const sendVerificationCodeEmail = async (email, name, verificationCode, purpose = 'password-change') => {
  try {
    const purposeText = purpose === 'forgot-password' ? 'Reset Your Password' : 'Change Your Password';
    const purposeDescription = purpose === 'forgot-password'
      ? 'We received a request to reset your password.'
      : 'You requested to change your password.';

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Your ${purposeText} Verification Code`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 5px;">
            <h1>${purposeText}</h1>
          </div>
          <div style="padding: 20px; background-color: #f5f5f5;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>${purposeDescription}</p>
            
            <p style="color: #666; margin-top: 20px; margin-bottom: 20px;">
              Please use the verification code below to proceed:
            </p>

            <div style="background-color: white; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0; border: 2px dashed #ff6b35;">
              <h2 style="margin: 0; color: #ff6b35; font-size: 32px; letter-spacing: 5px;">${verificationCode}</h2>
            </div>

            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              This code will expire in 10 minutes. If you didn't request this, please ignore this email.
            </p>

            <p style="color: #ff6b35; font-weight: bold; margin-top: 20px;">
              Do not share this code with anyone.
            </p>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Best regards,<br>
              CityBites Delivery Team
            </p>
          </div>
        </div>
      `
    };

    await getTransporter().sendMail(mailOptions);
    console.log(`Verification code email sent to ${email}`);
    return true;
  } catch (error) {
    console.log("Error sending verification code email:", error.message);
    return false;
  }
};
