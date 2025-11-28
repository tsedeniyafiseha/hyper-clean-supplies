# Netlify Deployment Guide - Full Stack Next.js

## Important Note
This Next.js application is a **full-stack application** with:
- API routes for backend functionality
- Server-side rendering (SSR)
- Database connections (PostgreSQL + Prisma)
- Authentication (NextAuth.js)

You must deploy the **entire application** (frontend + backend together), not just the frontend.

## Prerequisites

### 1. Database Setup
You need a PostgreSQL database. Options:
- **Neon** (Recommended - Free tier, serverless)
- **Supabase** (Free tier)
- **Railway** (Free tier)
- **Heroku Postgres**

### 2. GitHub Repository
Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step-by-Step Deployment on Netlify

### Step 1: Prepare Your Application

1. **Install Netlify CLI** (optional, for testing):
```bash
npm install -g netlify-cli
```

2. **Create `netlify.toml` in project root**:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/___netlify-handler"
  status = 200
```

3. **Update `next.config.mjs`** to ensure it's compatible:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    unoptimized: false,
  },
  // Netlify handles this automatically
  output: 'standalone',
};

export default nextConfig;
```

### Step 2: Set Up Database

#### Using Neon (Recommended):

1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string (looks like: `postgresql://user:pass@host/db?sslmode=require`)
5. You'll need both:
   - `DATABASE_URL` - for Prisma migrations
   - `DIRECT_URL` - for direct connections

### Step 3: Deploy on Netlify

1. **Go to [netlify.com](https://netlify.com)** and sign in

2. **Click "Add new site" → "Import an existing project"**

3. **Connect to GitHub** and select your repository

4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: (leave empty, auto-detected)

5. **Add Environment Variables** (Site settings → Environment variables):

```bash
# Database
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
DIRECT_URL=postgresql://user:pass@host/db?sslmode=require

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key-min-32-chars
NEXTAUTH_URL=https://your-site.netlify.app

# Admin
ADMIN_EMAIL=admin@yourdomain.com

# OAuth (if using)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

# Email (if using)
EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
EMAIL_FROM=noreply@yourdomain.com

# Sentry (optional)
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

6. **Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

7. **Click "Deploy site"**

### Step 4: Run Database Migrations

After first deployment, you need to set up the database:

**Option A: Using Netlify CLI**
```bash
# Install dependencies
npm install

# Set environment variables locally
export DATABASE_URL="your-database-url"
export DIRECT_URL="your-direct-url"

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

**Option B: Using Netlify Functions**
Create a one-time setup function or run migrations locally then push schema.

### Step 5: Configure Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable to your custom domain

### Step 6: Test Your Deployment

1. Visit your Netlify URL
2. Test key features:
   - Homepage loads
   - Products display
   - Sign in works
   - Admin dashboard accessible
   - API routes respond

## Common Issues & Solutions

### Issue 1: Build Fails
**Solution**: Check build logs, ensure all dependencies are in `package.json`

### Issue 2: Database Connection Fails
**Solution**: 
- Verify DATABASE_URL is correct
- Ensure database allows external connections
- Check SSL mode is set correctly

### Issue 3: Images Don't Load
**Solution**: 
- Add image domains to `next.config.mjs`
- Use `unoptimized: true` if needed

### Issue 4: API Routes Return 404
**Solution**: 
- Ensure `@netlify/plugin-nextjs` is installed
- Check `netlify.toml` configuration

### Issue 5: Authentication Fails
**Solution**:
- Verify NEXTAUTH_URL matches your site URL
- Check NEXTAUTH_SECRET is set
- Ensure OAuth redirect URIs are updated

## Performance Optimization

1. **Enable Netlify Edge Functions** for faster response times
2. **Configure caching** in `netlify.toml`:
```toml
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

3. **Enable Netlify Image CDN** for optimized images

## Monitoring

1. **Netlify Analytics**: Enable in site settings
2. **Sentry**: Already configured for error tracking
3. **Database Monitoring**: Use your database provider's dashboard

## Continuous Deployment

Once set up, every push to your main branch will:
1. Trigger a new build
2. Run tests (if configured)
3. Deploy automatically
4. Rollback on failure

## Alternative: Deploy on Vercel (Easier)

If you face issues with Netlify, Vercel is the recommended platform for Next.js:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

Vercel advantages:
- Built by Next.js creators
- Zero configuration
- Better Next.js support
- Automatic edge optimization
- Built-in PostgreSQL option

## Cost Comparison

**Netlify Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

**Vercel Free Tier:**
- 100GB bandwidth/month
- 6000 build minutes/month
- Unlimited sites
- Better Next.js support

## Support Resources

- [Netlify Next.js Docs](https://docs.netlify.com/frameworks/next-js/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages render
- [ ] API routes work
- [ ] Database connected
- [ ] Authentication works
- [ ] Admin dashboard accessible
- [ ] Images load
- [ ] Forms submit
- [ ] Payments work (if applicable)
- [ ] Email sending works (if applicable)
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Database seeded
- [ ] Error tracking active
