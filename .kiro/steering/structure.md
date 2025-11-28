# Project Structure

## Directory Organization

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API route handlers
│   │   ├── admin/         # Admin-only endpoints (products, categories, orders)
│   │   ├── auth/          # Authentication endpoints (signup, signin, verify)
│   │   ├── checkout/      # Stripe checkout session handling
│   │   ├── products/      # Public product endpoints
│   │   └── wishlist/      # Wishlist management
│   ├── account/           # User account pages
│   ├── admin/             # Admin dashboard pages
│   ├── cart/              # Shopping cart page
│   ├── shop/              # Product listing and detail pages
│   │   ├── category/[slug]/  # Category-filtered products
│   │   └── product/[...slug]/ # Product detail pages
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   └── providers.tsx      # Client-side providers (Redux, etc.)
│
├── components/            # React components
│   ├── analytics/         # Google Analytics wrapper
│   ├── cart-page/         # Cart-specific components
│   ├── common/            # Shared components (ProductCard, ReviewCard)
│   ├── homepage/          # Homepage sections (Header, Brands, Reviews)
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── product-page/      # Product detail components (tabs, image gallery)
│   ├── shop-page/         # Shop page components (filters, breadcrumbs)
│   ├── storage/           # Redux persist storage adapter
│   └── ui/                # ShadCN UI components (Button, Input, etc.)
│
├── lib/                   # Utility libraries and configurations
│   ├── features/          # Redux slices
│   │   ├── carts/         # Cart state management
│   │   └── products/      # Product state management
│   ├── hooks/             # Custom React hooks (Redux hooks)
│   ├── analytics.ts       # Analytics utilities
│   ├── api-middleware.ts  # API middleware helpers
│   ├── api-response.ts    # Standardized API responses
│   ├── auth.ts            # NextAuth configuration
│   ├── cache.ts           # Caching utilities
│   ├── email.ts           # Email sending utilities
│   ├── logger.ts          # Logging utilities
│   ├── middleware.ts      # Middleware helpers
│   ├── prisma.ts          # Prisma client singleton
│   ├── products.ts        # Product-related utilities
│   ├── rate-limit.ts      # Rate limiting
│   ├── store.ts           # Redux store configuration
│   ├── stripe.ts          # Stripe client configuration
│   ├── utils.ts           # General utilities (cn, compareArrays)
│   └── validation.ts      # Zod schemas for validation
│
├── styles/                # Global styles and fonts
│   ├── fonts/             # Custom font files (Integral CF, Satoshi)
│   └── globals.css        # Global CSS and Tailwind directives
│
├── types/                 # TypeScript type definitions
│   ├── product.types.ts   # Product-related types
│   └── review.types.ts    # Review-related types
│
└── middleware.ts          # Next.js middleware (auth, rate limiting)

prisma/
├── schema.prisma          # Database schema
├── migrations/            # Database migration files
└── seed.ts               # Database seeding script

public/
├── icons/                 # SVG icons
└── images/                # Static images
```

## Key Conventions

### File Naming
- React components: PascalCase (e.g., `ProductCard.tsx`)
- Utilities and configs: camelCase (e.g., `auth.ts`, `utils.ts`)
- API routes: `route.ts` (Next.js convention)
- Pages: `page.tsx` (Next.js convention)

### Import Aliases
- `@/*` maps to `src/*` for cleaner imports

### Component Organization
- Page-specific components in `components/{page-name}/`
- Shared components in `components/common/`
- UI primitives in `components/ui/`
- Use "use client" directive for client components

### API Routes
- Admin routes require authentication check via `getServerSession`
- Admin authorization via `ADMIN_EMAIL` environment variable
- Use Prisma client from `@/lib/prisma`
- Return standardized JSON responses
- Include error handling with try-catch

### State Management
- Redux for cart state (persisted)
- Server state via API routes and React Server Components
- Client state via React hooks

### Styling
- Tailwind utility classes preferred
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Custom colors defined in `tailwind.config.ts`
- Responsive design with mobile-first approach

### Database Access
- Always use Prisma client from `@/lib/prisma` singleton
- Include relations when needed with `include`
- Use transactions for multi-step operations
- Index frequently queried fields
