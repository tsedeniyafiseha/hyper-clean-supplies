# API Documentation

## Authentication

### Sign Up
`POST /api/auth/signup`

Create a new user account.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Sign In
Use NextAuth.js `/api/auth/signin` endpoint or credentials provider.

### Verify Email
`GET /api/auth/verify-email?token={token}`

Verify user email address.

### Forgot Password
`POST /api/auth/forgot-password`

**Body:**
```json
{
  "email": "john@example.com"
}
```

### Reset Password
`POST /api/auth/reset-password`

**Body:**
```json
{
  "token": "reset-token",
  "password": "newpassword123"
}
```

## Products

### Get All Products
`GET /api/products?page=1&limit=20&category=slug&minPrice=0&maxPrice=1000`

### Get Product by ID
`GET /api/products/{id}`

### Get Product Reviews
`GET /api/products/{id}/reviews`

### Create Review (Auth Required)
`POST /api/products/{id}/reviews`

**Body:**
```json
{
  "rating": 5,
  "comment": "Great product!"
}
```

## Categories

### Get All Categories
`GET /api/categories`

Returns all categories with product counts.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Cleaning Chemicals",
    "slug": "cleaning-chemicals",
    "_count": { "products": 15 }
  }
]
```

## Orders

### Get User Orders (Auth Required)
`GET /api/orders?page=1&limit=10`

Returns paginated list of orders for authenticated user.

**Response:**
```json
{
  "orders": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

## Checkout

### Create Checkout Session (Auth Optional)
`POST /api/checkout`

**Body:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Product Name",
      "srcUrl": "https://...",
      "price": 29.99,
      "quantity": 2
    }
  ],
  "adjustedTotalPrice": 59.98
}
```

### Stripe Webhook
`POST /api/checkout/webhook`

Handles Stripe payment confirmations.

## Wishlist

### Get Wishlist (Auth Required)
`GET /api/wishlist`

### Add to Wishlist (Auth Required)
`POST /api/wishlist`

**Body:**
```json
{
  "productId": 1
}
```

### Remove from Wishlist (Auth Required)
`DELETE /api/wishlist`

**Body:**
```json
{
  "productId": 1
}
```

## User Profile

### Get Profile (Auth Required)
`GET /api/user/profile`

### Update Profile (Auth Required)
`PATCH /api/user/profile`

**Body:**
```json
{
  "name": "John Doe",
  "email": "newemail@example.com"
}
```

## Admin Routes (Admin Only)

### Dashboard Stats
`GET /api/admin/stats`

### Products

#### Get All Products
`GET /api/admin/products?page=1&limit=50`

#### Get Product
`GET /api/admin/products/{id}`

#### Create Product
`POST /api/admin/products`

**Body:**
```json
{
  "title": "Product Name",
  "description": "Description",
  "price": 29.99,
  "imageUrl": "https://...",
  "categoryId": 1,
  "discountAmount": 0,
  "discountPercentage": 0,
  "stock": 100
}
```

#### Update Product
`PUT /api/admin/products/{id}`

#### Delete Product
`DELETE /api/admin/products/{id}`

### Categories

#### Get All Categories
`GET /api/admin/categories`

#### Get Category
`GET /api/admin/categories/{id}`

#### Create Category
`POST /api/admin/categories`

**Body:**
```json
{
  "name": "Category Name",
  "slug": "category-slug"
}
```

#### Update Category
`PUT /api/admin/categories/{id}`

#### Delete Category
`DELETE /api/admin/categories/{id}`

### Orders

#### Get All Orders
`GET /api/admin/orders?status=pending&page=1&limit=20`

#### Get Order
`GET /api/admin/orders/{id}`

#### Update Order Status
`PATCH /api/admin/orders/{id}`

**Body:**
```json
{
  "status": "shipped"
}
```

Valid statuses: `pending`, `paid`, `processing`, `shipped`, `delivered`, `cancelled`

## Health Check

### Health Status
`GET /api/health`

Returns server health status.
