# ==================================
# FORGOT PASSWORD SETUP GUIDE
# ==================================

## 📧 Email Configuration Required

To enable the forgot password feature, you need to configure email settings in your `.env` file.

### Option 1: Gmail (Recommended for Development)

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the generated 16-character password

4. Add to your `.env` file:

```env
# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password

# Frontend URL for reset links
FRONTEND_URL=http://localhost:3000
```

### Option 2: Other Email Services

#### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
FRONTEND_URL=http://localhost:3000
```

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
FRONTEND_URL=http://localhost:3000
```

#### AWS SES
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your-ses-smtp-username
EMAIL_PASSWORD=your-ses-smtp-password
FRONTEND_URL=http://localhost:3000
```

---

## 📦 Installation

Install the required package:

```bash
cd backend
npm install nodemailer
```

---

## 🚀 Usage Flow

### 1. User Requests Password Reset
- Navigate to `/forgot-password`
- Enter email address
- Click "Send Reset Link"
- User receives email with reset link (valid for 15 minutes)

### 2. User Resets Password
- Click link in email (goes to `/reset-password?token=xxx`)
- Token is verified automatically
- Enter new password and confirm
- Submit to update password
- Redirected to login page

---

## 🔒 Security Features Implemented

✅ **Token Hashing**: Tokens are hashed before storage using SHA-256
✅ **Single-Use Tokens**: Tokens are deleted after successful password reset
✅ **Expiration**: Tokens expire after 15 minutes
✅ **Rate Limiting**: Can be added to prevent abuse
✅ **Email Enumeration Prevention**: Same message shown regardless of email existence
✅ **Password Strength Validation**: Minimum 8 characters
✅ **Secure Password Hashing**: bcrypt with salt rounds
✅ **HTTPS Ready**: Designed for production with HTTPS

---

## 📂 Files Created

### Backend
- `models/PasswordReset.js` - MongoDB model for reset tokens
- `controllers/passwordResetController.js` - Business logic
- `routes/passwordResetRoutes.js` - API endpoints
- `services/emailService.js` - Email sending functionality

### Frontend
- `pages/ForgotPasswordPage.jsx` - Request reset page
- `pages/ResetPasswordPage.jsx` - Reset password page
- Updated `App.jsx` - Added new routes
- Updated `LoginForm.jsx` - Added "Forgot Password" link

---

## 🧪 Testing

### Test Locally with Ethereal (Fake SMTP)

If you don't want to use real email during development:

1. Go to https://ethereal.email/
2. Click "Create Ethereal Account"
3. Use the credentials in your `.env`:

```env
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your-ethereal-username
EMAIL_PASSWORD=your-ethereal-password
FRONTEND_URL=http://localhost:3000
```

4. Check received emails at: https://ethereal.email/messages

---

## 🎯 API Endpoints

### POST /api/password-reset/forgot-password
Request a password reset email

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "If this email exists in our system, a password reset link has been sent."
}
```

---

### GET /api/password-reset/verify-token/:token
Verify if a reset token is valid

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "email": "user@example.com"
}
```

---

### POST /api/password-reset/reset-password
Reset password with token

**Request Body:**
```json
{
  "token": "abc123...",
  "password": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password has been reset successfully."
}
```

---

## 🛡️ Production Checklist

Before deploying to production:

- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS (required for security)
- [ ] Add rate limiting middleware
- [ ] Use a professional email service (SendGrid, AWS SES, etc.)
- [ ] Set appropriate token expiration time
- [ ] Monitor email sending failures
- [ ] Add logging for security events
- [ ] Test email deliverability
- [ ] Update FRONTEND_URL to production domain
- [ ] Consider adding CAPTCHA to prevent bot abuse

---

## 🚨 Troubleshooting

### Emails not sending?
1. Check `.env` configuration
2. Verify email credentials
3. Check spam folder
4. Look at backend console for errors
5. For Gmail, ensure "Less secure app access" is enabled or use App Password

### Token expired error?
- Reset link is only valid for 15 minutes
- Request a new reset link

### Token not found?
- Token may have been used already (single-use)
- Link may be invalid or tampered with
- Request a new reset link

---

## 📞 Support

For issues or questions:
- Check backend logs: `npm run dev` in backend folder
- Check browser console for frontend errors
- Verify MongoDB connection
- Ensure all packages are installed

---

## 🎉 Feature Complete!

Your forgot password feature is now fully functional with:
- Beautiful UI/UX
- Secure token management
- Professional email templates
- Full error handling
- Production-ready code
