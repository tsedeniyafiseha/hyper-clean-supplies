# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Stripe account
- Email service (Gmail, SendGrid, etc.)
- Redis (optional, for caching)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in all required values:

```bash
cp .env.example .env.local
```

### Required Variables

1. **Database**
   - `DATABASE_URL`: PostgreSQL connection string
   - Format: `postgresql://username:password@host:port/database`

2. **NextAuth**
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your site URL (e.g., `https://yourdomain.com`)

3. **Stripe**
   - `STRIPE_SECRET_KEY`: From Stripe dashboard (starts with `sk_`)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: From Stripe dashboard (starts with `pk_`)
   - `STRIPE_WEBHOOK_SECRET`: From Stripe webhook settings (starts with `whsec_`)

4. **OAuth Providers** (Optional)
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
   - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: From GitHub OAuth Apps

5. **Email**
   - `SMTP_HOST`: SMTP server hostname
   - `SMTP_PORT`: Usually 587 for TLS or 465 for SSL
   - `SMTP_USER`: SMTP username
   - `SMTP_PASS`: SMTP password or app-specific password
   - `FROM_EMAIL`: Sender email address

6. **Admin**
   - `ADMIN_EMAIL`: Email address for admin access (must match admin user)

7. **Site Configuration**
   - `NEXT_PUBLIC_SITE_URL`: Full site URL for email links

8. **Sentry** (Optional but recommended)
   - `SENTRY_DSN`: From Sentry project settings
   - `NEXT_PUBLIC_SENTRY_DSN`: Same as above for client-side
   - `SENTRY_ENVIRONMENT`: `production`, `staging`, or `development`

9. **Redis** (Optional, for caching)
   - `REDIS_URL`: Redis connection string

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up database:
```bash
npm run prisma:migrate
npm run prisma:seed
```

3. Run development server:
```bash
npm run dev
```

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub

2. Import project in Vercel

3. Add environment variables in Vercel dashboard

4. Deploy

5. Set up Stripe webhook:
   - URL: `https://yourdomain.com/api/checkout/webhook`
   - Events: `checkout.session.completed`

### Docker

1. Build image:
```bash
docker build -t shopco .
```

2. Run with docker-compose:
```bash
docker-compose up -d
```

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Run migrations:
```bash
npm run db:migrate:deploy
```

3. Start production server:
```bash
npm start
```

## Database Setup

### Initial Migration
```bash
npm run prisma:migrate
```

### Seed Database
```bash
npm run prisma:seed
```

### View Database
```bash
npm run prisma:studio
```

## Post-Deployment

1. **Test Authentication**
   - Sign up with test account
   - Verify email works
   - Test OAuth providers

2. **Test Payments**
   - Use Stripe test cards
   - Verify webhook receives events
   - Check order creation

3. **Set Up Monitoring**
   - Configure Sentry for error tracking
   - Set up uptime monitoring
   - Enable logging

4. **Security Checklist**
   - [ ] HTTPS enabled
   - [ ] Environment variables secured
   - [ ] Rate limiting configured
   - [ ] CORS properly set
   - [ ] CSP headers configured
   - [ ] Database backups enabled

## Stripe Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/checkout/webhook`
3. Select event: `checkout.session.completed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## Email Configuration

### Gmail
1. Enable 2FA on Google account
2. Generate App Password
3. Use in `SMTP_PASS`

### SendGrid
1. Create API key
2. Use `smtp.sendgrid.net` as host
3. Port 587

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check database is accessible
- Ensure SSL mode is correct

### Email Not Sending
- Verify SMTP credentials
- Check firewall/port access
- Test with different provider

### Stripe Webhook Failing
- Verify webhook secret
- Check endpoint is publicly accessible
- Review Stripe dashboard logs

### Build Errors
- Clear `.next` folder
- Delete `node_modules` and reinstall
- Check Node.js version

## Performance Optimization

1. **Enable Redis caching**
   - Set `REDIS_URL` in environment
   - Improves rate limiting and caching

2. **Image Optimization**
   - Use Next.js Image component
   - Configure CDN in `NEXT_PUBLIC_CDN_URL`

3. **Database Optimization**
   - Add indexes (already in schema)
   - Configure connection pooling
   - Use read replicas for scaling

## Monitoring

### Sentry Setup
1. Create Sentry project
2. Add DSN to environment variables
3. Errors automatically tracked

### Health Check
- Endpoint: `/api/health`
- Use for uptime monitoring
- Returns server status

## Scaling

### Horizontal Scaling
- Deploy multiple instances
- Use load balancer
- Share Redis instance

### Database Scaling
- Enable connection pooling
- Use read replicas
- Consider managed database service

### CDN
- Configure for static assets
- Use for image delivery
- Reduce server load
