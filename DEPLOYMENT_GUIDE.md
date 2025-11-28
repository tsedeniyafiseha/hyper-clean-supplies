# Complete Deployment Guide - GitHub + Vercel

## Step 1: Push to GitHub

### 1.1 Initialize Git (if not already done)
```bash
git init
```

### 1.2 Create .gitignore (verify it exists and has these entries)
Make sure `.gitignore` includes:
```
node_modules/
.next/
.env
.env.local
.env*.local
.vercel
*.log
.DS_Store
```

### 1.3 Stage all files
```bash
git add .
```

### 1.4 Create initial commit
```bash
git commit -m "Initial commit - Hyper Clean Supplies e-commerce platform"
```

### 1.5 Create new repository on GitHub
1. Go to: https://github.com/tsedeniyafiseha
2. Click the "+" icon (top right) → "New repository"
3. Repository name: `hyper-clean-supplies` (or your preferred name)
4. Description: "Professional cleaning supplies e-commerce platform built with Next.js"
5. Keep it **Public** or **Private** (your choice)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 1.6 Connect and push to GitHub
```bash
# Add remote (replace YOUR-REPO-NAME with actual repo name)
git remote add origin https://github.com/tsedeniyafiseha/YOUR-REPO-NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

If you get authentication error, you may need to use a Personal Access Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when pushing

---

## Step 2: Set Up Database (Neon - Free PostgreSQL)

### 2.1 Create Neon Account
1. Go to: https://neon.tech
2. Sign up with GitHub (easiest)
3. Create a new project: "hyper-clean-db"
4. Select region closest to you
5. Copy the connection string

### 2.2 Get Connection Strings
You'll get two connection strings:
- **Pooled connection** (for DATABASE_URL)
- **Direct connection** (for DIRECT_URL)

Example format:
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## Step 3: Deploy to Vercel

### 3.1 Install Vercel CLI (Optional but helpful)
```bash
npm install -g vercel
```

### 3.2 Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

5. **Add Environment Variables** (CRITICAL):
   Click "Environment Variables" and add these:

```bash
# Database (from Neon)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
DIRECT_URL=postgresql://user:pass@host/db?sslmode=require

# NextAuth (generate secret below)
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-project.vercel.app

# Site URL (will be your Vercel URL)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Admin
ADMIN_EMAIL=admin@yourdomain.com

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
FROM_EMAIL=noreply@yourdomain.com

# OAuth (Optional - can add later)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Stripe (use test keys first)
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Sentry (Optional)
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

6. **Generate NEXTAUTH_SECRET**:
   Open terminal and run:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and use it as NEXTAUTH_SECRET

7. **Click "Deploy"**

---

## Step 4: Set Up Database Schema

After first deployment, you need to set up the database:

### 4.1 Install Vercel CLI (if not already)
```bash
npm install -g vercel
```

### 4.2 Link to your project
```bash
vercel link
```

### 4.3 Pull environment variables
```bash
vercel env pull .env.local
```

### 4.4 Run database migrations
```bash
npx prisma migrate deploy
```

### 4.5 Seed the database
```bash
npx prisma db seed
```

This will create:
- All database tables
- Sample products
- Categories
- Admin user (email from ADMIN_EMAIL, password: Admin123!)
- Test user (test@example.com, password: Test123!)

---

## Step 5: Update URLs After Deployment

### 5.1 Get your Vercel URL
After deployment, Vercel will give you a URL like:
`https://your-project-name.vercel.app`

### 5.2 Update Environment Variables
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Update these:
- `NEXTAUTH_URL` → `https://your-project-name.vercel.app`
- `NEXT_PUBLIC_SITE_URL` → `https://your-project-name.vercel.app`

### 5.3 Redeploy
Click "Deployments" → Three dots on latest deployment → "Redeploy"

---

## Step 6: Set Up OAuth (Optional but Recommended)

### Google OAuth:
1. Go to: https://console.cloud.google.com/
2. Create project or select existing
3. APIs & Services → Credentials
4. Create OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `https://your-project.vercel.app/api/auth/callback/google`
6. Copy Client ID and Secret
7. Add to Vercel environment variables
8. Redeploy

### GitHub OAuth:
1. Go to: https://github.com/settings/developers
2. New OAuth App
3. Homepage URL: `https://your-project.vercel.app`
4. Callback URL: `https://your-project.vercel.app/api/auth/callback/github`
5. Copy Client ID and Secret
6. Add to Vercel environment variables
7. Redeploy

---

## Step 7: Set Up Email (Gmail Example)

### 7.1 Enable 2FA on Gmail
1. Go to Google Account → Security
2. Enable 2-Step Verification

### 7.2 Generate App Password
1. Google Account → Security → 2-Step Verification
2. Scroll to bottom → App passwords
3. Select "Mail" and "Other (Custom name)"
4. Name it "Hyper Clean Supplies"
5. Copy the 16-character password
6. Use this as `SMTP_PASS` in Vercel

### 7.3 Update Vercel Environment Variables
Add/Update:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
FROM_EMAIL=noreply@yourdomain.com
```

---

## Step 8: Test Your Deployment

### 8.1 Visit your site
Go to: `https://your-project.vercel.app`

### 8.2 Test key features:
- [ ] Homepage loads
- [ ] Products display with images
- [ ] Sign up with email
- [ ] Check email for verification link
- [ ] Verify email works
- [ ] Sign in with verified account
- [ ] Test Google/GitHub OAuth (if configured)
- [ ] Browse products
- [ ] Add to cart
- [ ] Admin dashboard access (use ADMIN_EMAIL)
- [ ] Create/edit products in admin

---

## Step 9: Custom Domain (Optional)

### 9.1 Add Domain in Vercel
1. Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

### 9.2 Update Environment Variables
Update these to use your custom domain:
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_SITE_URL`

### 9.3 Update OAuth Redirect URIs
Update Google and GitHub OAuth apps with new domain

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Verify all dependencies in package.json
- Check for TypeScript errors

### Database Connection Fails
- Verify DATABASE_URL is correct
- Check Neon dashboard for connection issues
- Ensure SSL mode is set: `?sslmode=require`

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Email Not Sending
- Verify SMTP credentials
- Check Gmail app password is correct
- Look at Vercel function logs

### Images Not Loading
- Check image URLs are accessible
- Verify Next.js image domains in next.config.mjs
- Check browser console for errors

---

## Monitoring & Maintenance

### Vercel Dashboard
- Monitor deployments
- Check function logs
- View analytics

### Database (Neon)
- Monitor connection usage
- Check query performance
- Backup data regularly

### Sentry (Optional)
- Track errors in production
- Monitor performance
- Set up alerts

---

## Quick Commands Reference

```bash
# Push changes to GitHub
git add .
git commit -m "Your commit message"
git push

# Deploy to Vercel (auto-deploys from GitHub)
# Or manually:
vercel --prod

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed

# View Prisma Studio (database GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Check build locally
npm run build
npm start
```

---

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Database created on Neon
- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Database migrated and seeded
- [ ] Site accessible at Vercel URL
- [ ] Sign up/sign in works
- [ ] Email verification works
- [ ] OAuth configured (optional)
- [ ] Admin dashboard accessible
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Custom domain added (optional)

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Neon Docs**: https://neon.tech/docs

---

## Your Project URLs

After deployment, save these:
- **Live Site**: https://your-project.vercel.app
- **GitHub Repo**: https://github.com/tsedeniyafiseha/YOUR-REPO-NAME
- **Vercel Dashboard**: https://vercel.com/your-username/your-project
- **Database**: https://console.neon.tech

---

## Next Steps After Deployment

1. Test all features thoroughly
2. Set up custom domain
3. Configure OAuth providers
4. Add real products via admin dashboard
5. Set up Stripe for payments
6. Configure email templates
7. Add analytics (Google Analytics, etc.)
8. Set up monitoring (Sentry)
9. Create backup strategy
10. Document admin procedures

Good luck with your deployment! 🚀
