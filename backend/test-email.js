import nodemailer from 'nodemailer';
import 'dotenv/config.js';

// Test email transporter configuration
let transporter;

if (process.env.EMAIL_SERVICE === 'custom') {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
} else {
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

async function testEmail() {
  console.log('\n=== EMAIL CONFIGURATION TEST ===\n');

  console.log('Configuration loaded:');
  console.log(`SERVICE: ${process.env.EMAIL_SERVICE}`);
  console.log(`USER: ${process.env.EMAIL_USER}`);
  console.log(`FROM: ${process.env.EMAIL_FROM}`);

  if (process.env.EMAIL_SERVICE === 'custom') {
    console.log(`HOST: ${process.env.EMAIL_HOST}`);
    console.log(`PORT: ${process.env.EMAIL_PORT}`);
  }

  console.log('\n--- Testing Connection ---\n');

  try {
    // Verify transporter connection
    const verified = await transporter.verify();
    if (verified) {
      console.log('✅ SMTP Connection: SUCCESS');
    } else {
      console.log('❌ SMTP Connection: FAILED');
    }
  } catch (error) {
    console.log('❌ SMTP Connection Error:', error.message);
    return;
  }

  console.log('\n--- Sending Test Email ---\n');

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: 'test@example.com',
    subject: 'Test Email from Food Delivery App',
    html: '<h1>Test Email</h1><p>If you receive this, emails are working!</p>'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email Sent Successfully!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Response: ${info.response}`);
  } catch (error) {
    console.log('❌ Email Send Error:', error.message);
    console.log('Full Error:', error);
  }

  console.log('\n=== END TEST ===\n');
  process.exit(0);
}

testEmail();
