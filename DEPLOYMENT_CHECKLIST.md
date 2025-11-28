# Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

### Environment Configuration
- [ ] All environment variables set in `.env.local` or hosting platform
- [ ] `NEXTAUTH_SECRET` generated with strong random value
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Database URL configured for production database
- [ ] Stripe keys switched from test to live mode
- [ ] Stripe webhook secret configured for production
- [ ] SMTP credentials configured and tested
- [ ] Admin email set correctly
- [ ] Sentry DSN configured (if using)
- [ ] Redis URL configured (if using)
- [ ] Health check token generated

### Database
- [ ] Production database created
- [ ] Database migrations run: `npm run db:migrate:deploy`
- [ ] Database seeded with initial data: `npm run prisma:seed`
- [ ] Database backups configured
- [ ] Connection pooling configured
- [ ] Database indexes verified

### OAuth Providers (if using)
- [ ] Google OAuth credentials created for production domain
- [ ] GitHub OAuth app created for production domain
- [ ] Redirect URLs updated to production domain
- [ ] OAuth credentials added to environment variables

### Stripe Configuration
- [ ] Stripe account in live mode
- [ ] Webhook endpoint created: `https://yourdomain.com/api/checkout/webhook`
- [ ] Webhook event `checkout.session.completed` selected
- [ ] Webhook secret copied to environment variables
- [ ] Test payment in production (small amount)

### Email Configuration
- [ ] SMTP server accessible from production
- [ ] Email templates tested
- [ ] Sender email verified
- [ ] Test emails sent successfully
- [ ] Email verification flow tested
- [ ] Password reset flow tested

### Security
- [ ] HTTPS enabled and enforced
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] Rate limiting tested
- [ ] CORS configured correctly
- [ ] API authentication tested
- [ ] Admin routes protected
- [ ] Input validation on all forms
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified

### Code Quality
- [ ] All tests passing: `npm test`
- [ ] No TypeScript errors: `npm run build`
- [ ] ESLint passing: `npm run lint`
- [ ] Code reviewed
- [ ] Dependencies updated
- [ ] No console.log statements in production code
- [ ] Error handling implemented

### Performance
- [ ] Images optimized
- [ ] Lighthouse score > 90
- [ ] Page load times < 3s
- [ ] API response times < 500ms
- [ ] Database queries optimized
- [ ] Caching configured (if using Redis)
- [ ] CDN configured (if using)

### Monitoring & Logging
- [ ] Sentry error tracking configured
- [ ] Logging configured
- [ ] Uptime monitoring set up
- [ ] Health check endpoint tested
- [ ] Alert notifications configured
- [ ] Performance monitoring enabled

## Deployment

### Build & Deploy
- [ ] Production build successful: `npm run build`
- [ ] Build artifacts verified
- [ ] Deploy to hosting platform
- [ ] Environment variables set on platform
- [ ] Database migrations run on production
- [ ] Application starts successfully
- [ ] No errors in logs

### Post-Deployment Testing

#### Authentication
- [ ] User signup works
- [ ] Email verification works
- [ ] User login works
- [ ] Password reset works
- [ ] OAuth login works (Google)
- [ ] OAuth login works (GitHub)
- [ ] Session persistence works
- [ ] Logout works

#### Products
- [ ] Product listing loads
- [ ] Product search works
- [ ] Product filtering works
- [ ] Product detail page loads
- [ ] Product images load correctly
- [ ] Product reviews display

#### Shopping
- [ ] Add to cart works
- [ ] Cart persistence works
- [ ] Cart quantity updates
- [ ] Remove from cart works
- [ ] Checkout flow works
- [ ] Stripe payment works
- [ ] Order confirmation received
- [ ] Order confirmation email sent

#### Admin
- [ ] Admin login works
- [ ] Dashboard loads with correct stats
- [ ] Product creation works
- [ ] Product editing works
- [ ] Product deletion works
- [ ] Category management works
- [ ] Order listing works
- [ ] Order detail view works
- [ ] Order status updates work

#### User Account
- [ ] Profile page loads
- [ ] Profile updates work
- [ ] Order history displays
- [ ] Wishlist works

#### Error Handling
- [ ] 404 page displays correctly
- [ ] Error boundary catches errors
- [ ] API errors return proper status codes
- [ ] User-friendly error messages shown

#### Mobile
- [ ] Responsive design works on mobile
- [ ] Touch interactions work
- [ ] Mobile navigation works
- [ ] Forms work on mobile

#### Performance
- [ ] Pages load quickly
- [ ] Images load optimally
- [ ] No console errors
- [ ] No memory leaks

### Monitoring

#### First 24 Hours
- [ ] Monitor error rates in Sentry
- [ ] Check server logs for issues
- [ ] Monitor database performance
- [ ] Check API response times
- [ ] Monitor uptime
- [ ] Review user feedback

#### First Week
- [ ] Review analytics
- [ ] Check conversion rates
- [ ] Monitor payment success rate
- [ ] Review email delivery rates
- [ ] Check for performance issues
- [ ] Review security logs

## Rollback Plan

If issues occur:

1. **Immediate Issues**
   - [ ] Rollback to previous version
   - [ ] Notify users of downtime
   - [ ] Investigate root cause

2. **Database Issues**
   - [ ] Restore from backup
   - [ ] Verify data integrity
   - [ ] Re-run migrations if needed

3. **Communication**
   - [ ] Update status page
   - [ ] Notify stakeholders
   - [ ] Document incident

## Post-Deployment

- [ ] Update documentation
- [ ] Tag release in Git
- [ ] Update changelog
- [ ] Notify team of successful deployment
- [ ] Schedule post-mortem if issues occurred
- [ ] Plan next iteration

## Production URLs

- **Application**: https://yourdomain.com
- **Admin**: https://yourdomain.com/admin
- **API Health**: https://yourdomain.com/api/health
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Sentry**: https://sentry.io/organizations/your-org/projects/your-project
- **Database**: [Your database dashboard URL]

## Support Contacts

- **Technical Lead**: [Name/Email]
- **DevOps**: [Name/Email]
- **Database Admin**: [Name/Email]
- **Stripe Support**: https://support.stripe.com

## Notes

Add any deployment-specific notes here:
- 
- 
- 
