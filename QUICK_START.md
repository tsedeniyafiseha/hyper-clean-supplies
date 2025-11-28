# Quick Start Guide

Get the Hyper Cleaning Supplies e-commerce platform running locally in minutes.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Git installed

## 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd next-ecommerce-shopco

# Install dependencies
npm install
```

## 2. Set Up Environment

```bash
# Copy environment example
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Minimum required for local development
DATABASE_URL="postgresql://username:password@localhost:5432/shopco_db"
NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_EMAIL="admin@localhost.com"

# Stripe (use test keys)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (optional for local dev)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FROM_EMAIL="noreply@localhost.com"
```

## 3. Set Up Database

```bash
# Run migrations
npm run prisma:migrate

# Seed with sample data
npm run prisma:seed
```

This creates:
- 7 product categories
- 8 sample products
- Admin user: `admin@localhost.com` / `Admin123!`
- Test user: `test@example.com` / `Test123!`

## 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. Access Admin Dashboard

1. Go to [http://localhost:3000/signin](http://localhost:3000/signin)
2. Sign in with admin credentials:
   - Email: `admin@localhost.com`
   - Password: `Admin123!`
3. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)

## Quick Test Checklist

### User Flow
- [ ] Browse products at `/shop`
- [ ] View product detail
- [ ] Add product to cart
- [ ] View cart at `/cart`
- [ ] Sign up at `/signup`
- [ ] Verify email (check console logs for link)
- [ ] Sign in at `/signin`
- [ ] Complete checkout (use Stripe test card: `4242 4242 4242 4242`)
- [ ] View order confirmation
- [ ] Check order history at `/account/orders`

### Admin Flow
- [ ] Sign in as admin
- [ ] View dashboard at `/admin`
- [ ] Create new product at `/admin/products/new`
- [ ] Edit product
- [ ] Create category at `/admin/categories`
- [ ] View orders at `/admin/orders`
- [ ] Update order status

## Stripe Test Cards

For testing payments:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date and any CVC.

## Common Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm start                  # Start production server

# Database
npm run prisma:studio      # Open database GUI
npm run prisma:migrate     # Create new migration
npm run prisma:generate    # Regenerate Prisma client
npm run prisma:seed        # Seed database

# Testing
npm test                   # Run tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report

# Code Quality
npm run lint               # Run ESLint
```

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env.local
# Try: npm run prisma:generate
```

### Port Already in Use
```bash
# Kill process on port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill
```

### Prisma Client Error
```bash
npm run prisma:generate
```

### Email Not Sending
- Email is optional for local development
- Check SMTP credentials if needed
- Verification links appear in console logs

### Stripe Webhook Not Working Locally
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/checkout/webhook

# Copy webhook secret to .env.local
```

## Project Structure

```
src/
├── app/                 # Next.js pages and API routes
│   ├── api/            # API endpoints
│   ├── admin/          # Admin pages
│   ├── shop/           # Shop pages
│   └── ...
├── components/         # React components
├── lib/                # Utilities and config
└── styles/             # Global styles

prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Seed script
```

## Key URLs

- **Homepage**: http://localhost:3000
- **Shop**: http://localhost:3000/shop
- **Cart**: http://localhost:3000/cart
- **Sign In**: http://localhost:3000/signin
- **Sign Up**: http://localhost:3000/signup
- **Admin**: http://localhost:3000/admin
- **API Health**: http://localhost:3000/api/health
- **Prisma Studio**: http://localhost:5555 (after running `npm run prisma:studio`)

## Default Credentials

### Admin User
- Email: `admin@localhost.com`
- Password: `Admin123!`

### Test User
- Email: `test@example.com`
- Password: `Test123!`

## Next Steps

1. **Explore the codebase**
   - Read `PROJECT_STATUS.md` for feature overview
   - Check `API.md` for API documentation
   - Review `TESTING.md` for testing guide

2. **Customize**
   - Update branding and colors in `tailwind.config.ts`
   - Modify product categories in seed script
   - Add your own products

3. **Deploy**
   - Follow `DEPLOYMENT.md` for deployment guide
   - Use `DEPLOYMENT_CHECKLIST.md` before going live

## Getting Help

- **Documentation**: Check the `/docs` folder
- **API Reference**: See `API.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Testing**: See `TESTING.md`

## Development Tips

1. **Use Prisma Studio** for database inspection:
   ```bash
   npm run prisma:studio
   ```

2. **Check logs** for email verification links (console output)

3. **Use Redux DevTools** to inspect cart state

4. **Test with Stripe CLI** for webhook testing locally

5. **Run tests** before committing:
   ```bash
   npm test
   ```

## Ready to Deploy?

See `DEPLOYMENT_CHECKLIST.md` for a complete pre-deployment checklist.

---

**Happy coding! 🚀**
