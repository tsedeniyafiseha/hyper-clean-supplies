# Technology Stack

## Framework & Runtime
- **Next.js 14** with App Router (React 18)
- **TypeScript 5** for type safety
- **Node.js** runtime

## Database & ORM
- **PostgreSQL** database
- **Prisma ORM** for database access and migrations
- Foreign key relations enabled

## Authentication & Security
- **NextAuth.js v4** for authentication
- OAuth providers: Google, GitHub
- Credentials provider with bcrypt password hashing
- JWT session strategy with Prisma adapter
- Email verification with token-based system

## State Management
- **Redux Toolkit** for global state
- **redux-persist** for cart persistence
- Client-side storage for cart state

## Styling & UI
- **Tailwind CSS** utility-first styling
- **ShadCN UI** component library (Radix UI primitives)
- **Framer Motion** for animations
- Custom fonts: Integral CF (headings), Satoshi (body)
- **class-variance-authority** and **clsx** for conditional styling

## Payment Processing
- **Stripe** for checkout and payment handling

## Additional Libraries
- **Zod** for schema validation
- **Nodemailer** for email sending
- **ioredis** for caching/rate limiting
- **Sentry** for error tracking
- **lucide-react** and **react-icons** for icons

## Development Tools
- **Jest** with React Testing Library for testing
- **ESLint** for code linting
- **PostCSS** for CSS processing

## Common Commands

```bash
# Development
npm run dev                 # Start dev server on localhost:3000

# Building
npm run build              # Generate Prisma client and build for production
npm start                  # Start production server

# Database
npm run prisma:migrate     # Run database migrations (dev)
npm run prisma:generate    # Generate Prisma client
npm run prisma:studio      # Open Prisma Studio GUI
npm run prisma:seed        # Seed database with initial data
npm run db:push            # Push schema changes without migration
npm run db:migrate:deploy  # Deploy migrations (production)

# Testing
npm test                   # Run tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report

# Code Quality
npm run lint               # Run ESLint
```

## Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `NEXTAUTH_URL` - Application URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` - GitHub OAuth
- `ADMIN_EMAIL` - Admin user email for authorization
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe keys
- `EMAIL_*` - Email service configuration (SMTP)
- `REDIS_URL` - Redis connection for caching (optional)
