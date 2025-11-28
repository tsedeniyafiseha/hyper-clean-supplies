# Quick Deploy Guide - 5 Minutes ⚡

## Step 1: Push to GitHub (2 minutes)

Open your terminal in the project folder and run:

```bash
# Initialize git (if not already done)
git init

# Stage all files
git add .

# Create first commit
git commit -m "Initial commit - Hyper Clean Supplies"

# Create new repo on GitHub:
# Go to: https://github.com/tsedeniyafiseha
# Click "+" → "New repository"
# Name: hyper-clean-supplies
# Click "Create repository"

# Connect and push (replace YOUR-REPO-NAME)
git remote add origin https://github.com/tsedeniyafiseha/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

---

## Step 2: Create Database (1 minute)

1. Go to: **https://neon.tech**
2. Sign up with GitHub
3. Create project: "hyper-clean-db"
4. **Copy both connection strings** (you'll need them)

---

## Step 3: Deploy to Vercel (2 minutes)

1. Go to: **https://vercel.com**
2. Sign up with GitHub
3. Click **"Add New..." → "Project"**
4. Select your repository
5. Click **"Import"**

### Add Environment Variables:

**REQUIRED (Minimum to deploy):**
```bash
DATABASE_URL=your-neon-connection-string
DIRECT_URL=your-neon-connection-string
NEXTAUTH_SECRET=run-this-command-to-generate
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
ADMIN_EMAIL=your-email@gmail.com
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

6. Click **"Deploy"**

---

## Step 4: Set Up Database (After first deploy)

```bash
# Install Vercel CLI
npm install -g vercel

# Link project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

---

## Step 5: Update URLs

1. After deployment, Vercel gives you a URL like: `https://your-project-abc123.vercel.app`
2. Go to Vercel Dashboard → Settings → Environment Variables
3. Update:
   - `NEXTAUTH_URL` → your Vercel URL
   - `NEXT_PUBLIC_SITE_URL` → your Vercel URL
4. Redeploy (Deployments → Redeploy)

---

## ✅ Done! Test Your Site

Visit: `https://your-project.vercel.app`

**Test:**
- Sign up with email
- Check verification email
- Sign in
- Browse products
- Admin dashboard (use ADMIN_EMAIL)

---

## Optional: Add OAuth & Email (Later)

### Email (Gmail):
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
FROM_EMAIL=noreply@yourdomain.com
```

### Google OAuth:
1. https://console.cloud.google.com/
2. Create OAuth Client
3. Add redirect: `https://your-site.vercel.app/api/auth/callback/google`
4. Add to Vercel env vars

### GitHub OAuth:
1. https://github.com/settings/developers
2. New OAuth App
3. Callback: `https://your-site.vercel.app/api/auth/callback/github`
4. Add to Vercel env vars

---

## Need Help?

See full guide: `DEPLOYMENT_GUIDE.md`

## Default Admin Login

After seeding database:
- Email: (your ADMIN_EMAIL)
- Password: `Admin123!`

## Test User

- Email: `test@example.com`
- Password: `Test123!`
