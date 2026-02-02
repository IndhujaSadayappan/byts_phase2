# Gmail Email Setup for Password Reset (2 Minutes)

## Quick Setup Steps:

### Step 1: Enable 2-Factor Authentication (if not already enabled)
1. Go to: **https://myaccount.google.com/security**
2. Click **"2-Step Verification"**
3. Follow the steps to enable it

### Step 2: Generate App Password
1. Go to: **https://myaccount.google.com/apppasswords**
2. You might need to re-enter your password
3. Under "Select app", choose: **Mail**
4. Under "Select device", choose: **Other (Custom name)**
5. Type: `PlaceHub Password Reset`
6. Click **"Generate"**
7. **COPY the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 3: Update .env File
Open `backend/.env` and replace these lines:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Example:**
```env
GMAIL_USER=shanthidaarun@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Important Notes:**
- Remove all spaces from the app password (copy as-is from Google)
- Use your actual Gmail address
- DO NOT use your regular Gmail password - must be App Password

### Step 4: Restart Backend Server
```bash
# Stop server (Ctrl+C)
cd backend
npm run dev
```

### Step 5: Test
1. Go to forgot password page: `http://localhost:3000/forgot-password`
2. Enter any registered user's email
3. **Check that email's inbox** (including spam folder)
4. Email should arrive within 10-30 seconds

## ✅ Advantages of Gmail:
- ✓ Quick setup (2 minutes)
- ✓ Familiar interface
- ✓ Works from anywhere
- ✓ Free for moderate usage
- ✓ No third-party accounts needed

## 🔧 Troubleshooting:

### "Invalid credentials" error
- Make sure 2FA is enabled on your Google account
- Use App Password, NOT your regular Gmail password
- Remove spaces from the app password

### Email not received
- Check spam/junk folder
- Try sending to your own Gmail first to test
- Make sure backend server restarted after .env changes

### "Less secure app" error
- Don't use "Less secure apps" option (deprecated)
- Must use App Password with 2FA enabled

## 🔒 Security:
- App passwords can be revoked anytime from Google Account settings
- Each app gets its own password
- Your main Gmail password stays secure
- You can see which apps are using app passwords

## 📊 Email Limits:
Gmail has these limits to prevent spam:
- **500 emails per day** (more than enough for testing)
- **100 emails per 24 hours** if frequently marked as spam

## Alternative: SendGrid (if Gmail doesn't work)
If your network still blocks Gmail SMTP, use SendGrid instead - it works over HTTPS.
See `SENDGRID_SETUP_GUIDE.md` for instructions.
