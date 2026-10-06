# Email Notification System Setup Guide

## Overview
This email notification system sends automated emails for:
- **User Registration** - Welcome email when user signs up
- **Order Confirmation** - Email sent after successful payment with order details
- **Order Status Updates** - Email sent when admin updates order status
- **Password Reset** - Email with reset link (for future implementation)

## Installation Steps

### Step 1: Install Required Package

In the backend directory, run:
```bash
cd backend
npm install nodemailer
```

### Step 2: Choose an Email Service

#### **Option A: Gmail (Recommended for Development)**

1. Go to https://myaccount.google.com/
2. Click on "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled
4. Go to https://myaccount.google.com/apppasswords
5. Select "Mail" and "Windows Computer" (or your device)
6. Google will generate a 16-character app password
7. Copy this password

#### **Option B: SendGrid (Recommended for Production)**

1. Create account at https://sendgrid.com/
2. Go to Settings → API Keys
3. Create a new API key
4. Use `apikey` as username and the generated key as password
5. Change `EMAIL_SERVICE` to `sendgrid` in `.env`

#### **Option C: Mailtrap (For Testing)**

1. Create account at https://mailtrap.io/
2. Click on "Inboxes" in the left menu
3. Click "Create Inbox" and give it a name (e.g., "Food Delivery Testing")
4. Open your newly created inbox
5. Click on "Integrations" tab
6. Select "Nodemailer" from the list
7. Copy the credentials shown - it will look like:
   ```javascript
   host: "smtp.mailtrap.io"
   port: 465  // or 2525
   auth: {
     user: "1a2b3c4d5e6f7g"
     pass: "8h9i0j1k2l3m4n"
   }
   ```
8. Add to your `.env` file:
   ```env
   EMAIL_SERVICE="custom"
   EMAIL_HOST="smtp.mailtrap.io"
   EMAIL_PORT="465"
   EMAIL_USER="your-mailtrap-user"
   EMAIL_PASS="your-mailtrap-password"
   EMAIL_FROM="noreply@fooddelivery.com"
   ```
9. Update `backend/utils/emailService.js` transporter configuration to use these variables:
   ```javascript
   const transporter = nodemailer.createTransport({
     host: process.env.EMAIL_HOST,
     port: process.env.EMAIL_PORT,
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
     }
   });
   ```

**Mailtrap Benefits for Testing:**
- All emails are captured and displayed in the inbox
- No risk of sending to real users
- Perfect for development and staging
- Free account includes up to 500 emails/month

### Step 3: Configure Environment Variables

Update `backend/.env` with your email credentials:

```env
# For Gmail
EMAIL_SERVICE="gmail"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-16-character-app-password"
EMAIL_FROM="noreply@fooddelivery.com"

# For SendGrid
# EMAIL_SERVICE="sendgrid"
# EMAIL_USER="apikey"
# EMAIL_PASS="your-sendgrid-api-key"
# EMAIL_FROM="noreply@fooddelivery.com"

# For Mailtrap
# EMAIL_SERVICE="custom"
# EMAIL_HOST="smtp.mailtrap.io"
# EMAIL_PORT="465"
# EMAIL_USER="your-mailtrap-user-id"
# EMAIL_PASS="your-mailtrap-password"
# EMAIL_FROM="noreply@fooddelivery.com"
```

### Step 4: Restart Backend Server

```bash
npm run server
```

## Implementation Details

### Files Added/Modified

#### New Files:
- `backend/utils/emailService.js` - Email templates and sending logic

#### Modified Files:
- `backend/controllers/userController.js` - Added welcome email on registration
- `backend/controllers/orderController.js` - Added order confirmation and status emails
- `backend/.env` - Added email configuration

### Email Functions

#### `sendWelcomeEmail(email, name)`
Sends welcome email when user registers

#### `sendOrderConfirmationEmail(email, name, orderId, items, amount, address)`
Sends order confirmation with itemized list

#### `sendOrderStatusEmail(email, name, orderId, status)`
Sends status update when admin changes order status

#### `sendPasswordResetEmail(email, name, resetToken)` (Ready for future use)
Sends password reset link

## How It Works

### 1. User Registration Flow
```
User signs up → Password hashed → User saved → Welcome email sent
```

### 2. Order Confirmation Flow
```
Payment success → Order confirmation email sent with:
  - Order ID
  - Itemized list
  - Total amount
  - Delivery address
```

### 3. Order Status Update Flow
```
Admin updates status → Status change saved → Email sent to user with:
  - Order ID
  - New status
  - Status message
```

## Testing

### To test locally without configuring real email:

1. Use **Mailtrap** - provides test emails
2. Use **MailHog** - local email testing tool
3. Or enable "Less secure app access" in Gmail (not recommended for production)

### Test Email Sending:
```bash
# Create a test script in backend/test-email.js
import { sendWelcomeEmail } from './utils/emailService.js';

await sendWelcomeEmail('test@example.com', 'Test User');
```

## Troubleshooting

### "Authentication failed" error
- Check if credentials are correct
- Verify 2FA and app password for Gmail
- Ensure EMAIL_PASS is the 16-character app password, not your actual password

### "Cannot find module nodemailer"
- Run `npm install nodemailer` in backend directory

### Emails not being sent
- Check backend console for errors
- Verify email credentials in `.env`
- Ensure SMTP is not blocked by firewall
- Check spam/junk folder

## Email Templates

All emails include:
- Company branding (orange theme: #ff6b35)
- Professional HTML formatting
- Mobile-responsive design
- Clear call-to-action buttons
- Footer with company info

## Future Enhancements

- Add email preferences to user profile
- Implement email verification on signup
- Add SMS notifications as alternative
- Create email templates with dynamic variables
- Add email scheduling
- Track email delivery and opens
- Implement retry logic for failed sends

## Support

For issues, check:
1. Backend console logs
2. Email service provider dashboard
3. Spam/junk folders
4. `.env` file configuration
