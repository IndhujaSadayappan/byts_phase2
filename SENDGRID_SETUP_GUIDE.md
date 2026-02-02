# SendGrid Email Setup Guide

SendGrid is a cloud-based email service that works over **HTTPS** (not SMTP), so it bypasses your network restrictions.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create SendGrid Account
1. Go to [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
2. Sign up with your email (use your college/personal email)
3. Verify your email address
4. **Free plan**: 100 emails/day forever (no credit card needed)

### Step 2: Create API Key
1. After login, go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Name it: `PlaceHub-Password-Reset`
4. Select **"Full Access"** (or "Restricted Access" with Mail Send permission)
5. Click **"Create & View"**
6. **COPY the API key** (you'll only see it once!)
   - It starts with `SG.` and is very long

### Step 3: Verify Sender Email
SendGrid requires you to verify the email address you'll send FROM:

1. Go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in your details:
   - **From Name**: PlaceHub Support
   - **From Email Address**: Your email (e.g., `your-email@gmail.com`)
   - **Reply To**: Same as above
   - **Address, City, etc.**: Fill with your info
4. Click **"Create"**
5. **Check your email** and click the verification link
6. Once verified, this email can send emails via SendGrid

### Step 4: Update .env File
Open `backend/.env` and replace these values:

```env
# SendGrid Email Configuration
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_FROM_EMAIL=your-verified-email@gmail.com
```

**Important:**
- `SENDGRID_API_KEY`: Paste the API key you copied in Step 2
- `SENDGRID_FROM_EMAIL`: Use the EXACT email you verified in Step 3

### Step 5: Restart Backend Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd backend
npm run dev
```

## ✅ Testing

1. Go to your frontend: `http://localhost:3000`
2. Click **"Forgot Password?"**
3. Enter any registered user's email
4. **Check that email inbox** - you should receive the reset email within seconds!

## 🎯 How It Works

- **HTTPS**: SendGrid uses port 443 (HTTPS), not blocked by your network
- **No SMTP**: Completely bypasses SMTP ports 587/465
- **Free Tier**: 100 emails/day forever
- **Real Emails**: Actual emails delivered to real inboxes

## 🔍 Troubleshooting

### "SENDGRID_API_KEY is not configured"
- Make sure you added the API key to `.env`
- Restart your backend server

### "From email not verified"
- Go to SendGrid dashboard
- Check Sender Authentication → must be green checkmark
- If not verified, check your email for verification link

### Emails not received
- Check spam/junk folder
- Verify the sender email in SendGrid dashboard
- Check SendGrid Activity Feed for delivery status
- Free accounts may have slight delays

### API Key doesn't work
- Make sure you copied the full key (starts with `SG.`)
- No spaces before/after the key in `.env`
- API key has "Mail Send" permission

## 📊 Monitor Email Activity

1. Go to SendGrid dashboard
2. Navigate to **Activity Feed**
3. See all sent emails, delivery status, opens, clicks, etc.

## 🆚 Why SendGrid over SMTP?

| Feature | SMTP (Gmail/Ethereal) | SendGrid |
|---------|----------------------|----------|
| Network | Blocked in college/corporate | ✅ Works everywhere |
| Ports | 587, 465 (blocked) | 443 (HTTPS - open) |
| Setup | Email + App Password | API Key only |
| Free Tier | Limited | 100/day forever |
| Delivery Rate | Good | Excellent |
| Analytics | None | Full tracking |

## 💡 Production Ready

SendGrid is production-ready and used by companies like:
- Uber
- Airbnb
- Spotify
- Many Fortune 500 companies

Your forgot password feature is now enterprise-grade! 🚀
