# VibePrints - Comprehensive Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Database Schema](#database-schema)
5. [Core Features](#core-features)
6. [Data Flow](#data-flow)
7. [Authentication System](#authentication-system)
8. [State Management](#state-management)
9. [Component Structure](#component-structure)
10. [API Integration](#api-integration)
11. [Performance Optimization](#performance-optimization)
12. [Security Considerations](#security-considerations)
13. [Deployment](#deployment)
14. [Future Enhancements](#future-enhancements)

---

## Project Overview

VibePrints is a modern e-commerce platform for purchasing aesthetic posters inspired by music, cinema, and sports culture. The application provides users with the ability to browse, search, favorite, and purchase posters across multiple categories.

### Key Objectives
- Provide a seamless user experience for browsing and purchasing posters
- Implement secure user authentication and session management
- Enable personalized features like favorites and order tracking
- Maintain a responsive, accessible, and performant application
- Leverage modern web technologies for scalability

### Target Audience
- Art and design enthusiasts
- Music fans seeking album-inspired posters
- Movie lovers wanting cinematic artwork
- Sports fans celebrating iconic moments

---

## Technology Stack

### Frontend Technologies

#### Next.js 16.2.6
**Why Next.js?**
- **Server-Side Rendering (SSR)**: Improves SEO and initial page load performance
- **Static Site Generation (SSG)**: Pre-renders pages at build time for faster delivery
- **File-based Routing**: Intuitive route organization using the `app/` directory
- **API Routes**: Built-in backend capabilities without separate server
- **Automatic Code Splitting**: Optimizes bundle sizes automatically
- **Image Optimization**: Next.js Image component for automatic optimization
- **React Server Components**: Reduces client-side JavaScript for better performance

#### React 19.2.6
**Why React?**
- **Component-Based Architecture**: Reusable, modular UI components
- **Virtual DOM**: Efficient updates and rendering
- **Rich Ecosystem**: Vast library support and community
- **Hooks**: Simplified state management and side effects
- **Concurrent Features**: Improved user experience with concurrent rendering

#### TypeScript 5
**Why TypeScript?**
- **Type Safety**: Catches errors at compile-time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Improved Maintainability**: Easier to understand and modify code
- **Interface Definitions**: Clear contracts between components

#### Tailwind CSS 4
**Why Tailwind CSS?**
- **Utility-First Approach**: Rapid UI development without custom CSS
- **Responsive Design**: Built-in responsive modifiers
- **Dark Mode Support**: Easy dark mode implementation
- **Small Bundle Size**: Only includes used styles
- **Customization**: Highly configurable design system
- **Consistency**: Enforces design system across the application

#### Framer Motion 12.40.0
**Why Framer Motion?**
- **Smooth Animations**: High-performance animations
- **Gesture Support**: Built-in gesture recognition
- **Layout Animations**: Automatic layout transitions
- **Scroll Animations**: Easy scroll-triggered effects
- **Declarative API**: Simple, readable animation syntax

### Backend Technologies

#### Supabase 2.106.2
**Why Supabase?**
- **Backend-as-a-Service**: Eliminates need for custom backend
- **PostgreSQL Database**: Robust, scalable relational database
- **Authentication**: Built-in auth with multiple providers
- **Real-time Subscriptions**: Live data updates
- **Storage Integration**: File storage capabilities
- **Row-Level Security**: Database-level access control
- **RESTful API**: Auto-generated API from database schema
- **Edge Functions**: Serverless compute at the edge

**Supabase vs Traditional Backend:**
- **Faster Development**: No need to build and maintain backend infrastructure
- **Cost-Effective**: Pay-as-you-go pricing model
- **Scalability**: Automatic scaling without configuration
- **Security**: Built-in security features and best practices
- **Real-time**: Built-in real-time capabilities

---

## Architecture

### Application Structure

```
VibePrints/
├── app/                      # Next.js App Router
│   ├── categories/          # Category pages
│   ├── favorites/           # User favorites
│   ├── cart/                # Shopping cart
│   ├── login/               # Authentication
│   ├── register/            # User registration
│   ├── posters/             # Poster details
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── Hero.tsx             # Landing hero section
│   ├── Navbar.tsx           # Navigation bar
│   ├── PosterCard.tsx       # Poster display card
│   ├── CategoryCard.tsx     # Category display card
│   ├── PosterDetail.tsx     # Detailed poster view
│   ├── TrendingSection.tsx  # Trending posters
│   ├── CategoriesSection.tsx # Category overview
│   ├── AuthWidget.tsx       # Authentication UI
│   ├── DarkModeToggle.tsx  # Theme switcher
│   └── Container.tsx        # Layout container
├── hooks/                   # Custom React hooks
│   ├── useSupabaseAuth.ts   # Authentication hook
│   └── useDarkMode.ts       # Dark mode hook
├── lib/                     # Utility libraries
│   ├── supabase.ts          # Supabase client
│   ├── posters.ts           # Sample poster data
│   └── categorySections.ts  # Category configuration
├── services/                # Business logic layer
│   ├── posterService.ts     # Poster operations
│   ├── favoriteService.ts   # Favorite operations
│   └── orderService.ts      # Order operations
├── types/                   # TypeScript definitions
│   ├── poster.ts            # Poster types
│   └── order.ts             # Order types
└── scripts/                 # Utility scripts
    └── update-horror-posters.js # Database update script
```

### Architectural Patterns

#### Service Layer Pattern
The application uses a service layer to separate business logic from UI components:
- **posterService.ts**: Handles all poster-related database operations
- **favoriteService.ts**: Manages user favorites
- **orderService.ts**: Processes order creation

**Benefits:**
- Separation of concerns
- Reusability across components
- Easier testing and maintenance
- Centralized error handling

#### Client/Server Component Pattern
Next.js 13+ uses React Server Components by default:
- **Server Components**: Render on the server, no JavaScript sent to client
- **Client Components**: Render on client, marked with `"use client"`

**Usage in VibePrints:**
- Server Components: Category pages, poster detail pages (static content)
- Client Components: Interactive elements (favorites, cart, auth)

#### Custom Hooks Pattern
Custom hooks encapsulate reusable stateful logic:
- `useSupabaseAuth`: Manages authentication state and session
- `useDarkMode`: Handles theme switching

**Benefits:**
- Logic reuse across components
- Cleaner component code
- Easier testing

---

## Database Schema

### Tables

#### Posters Table
```sql
CREATE TABLE posters (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  section TEXT,
  creator TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  created_at TIMESTAMP
);
```

**Purpose:** Stores all poster information including metadata, pricing, and image URLs.

**Indexes:**
- Primary key on `id` for fast lookups
- Index on `category` for category filtering
- Index on `section` for section filtering

#### Favorites Table
```sql
CREATE TABLE favorites (
  id INTEGER PRIMARY KEY,
  user_id TEXT NOT NULL,
  poster_id INTEGER NOT NULL,
  created_at TIMESTAMP,
  FOREIGN KEY (poster_id) REFERENCES posters(id)
);
```

**Purpose:** Tracks which posters users have favorited.

**Relationships:**
- Many-to-many relationship between users and posters
- Enforced foreign key constraint to `posters` table

**Row-Level Security (RLS):**
- Users can only see their own favorites
- Users can only add/remove their own favorites

#### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id TEXT NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP
);
```

**Purpose:** Records user orders for tracking and history.

**JSONB Structure:**
```json
{
  "id": 1,
  "title": "Poster Name",
  "price": 49.00,
  "quantity": 2
}
```

**Row-Level Security:**
- Users can only see their own orders
- Users can only create orders for themselves

### Database Design Decisions

#### Why PostgreSQL?
- **ACID Compliance**: Ensures data integrity
- **Complex Queries**: Support for advanced queries
- **JSONB**: Flexible JSON storage with indexing
- **Full-Text Search**: Built-in search capabilities
- **Extensions**: Rich ecosystem of extensions

#### Why JSONB for Order Items?
- **Flexibility**: Easy to modify order structure
- **Queryability**: Can query inside JSON data
- **Performance**: Efficient storage and retrieval
- **No Additional Tables**: Avoids complex joins

---

## Core Features

### 1. Poster Browsing

**Implementation:**
- Server-side rendering for initial page load
- Category-based filtering
- Section-based grouping within categories
- Responsive grid layout

**Data Flow:**
1. User navigates to category page
2. `getPostersByCategory()` fetches posters from Supabase
3. Posters are grouped by section
4. Server component renders the page
5. Client-side interactions (favorites) handled by client components

**Key Files:**
- `app/categories/[category]/page.tsx`
- `services/posterService.ts`
- `lib/categorySections.ts`

### 2. User Authentication

**Implementation:**
- Supabase Auth for authentication
- Email/password authentication
- Session management with React hooks
- Protected routes for authenticated features

**Authentication Flow:**
1. User enters credentials on login/register page
2. Supabase validates credentials
3. Session token stored in browser
4. `useSupabaseAuth` hook manages session state
5. Auth state changes trigger UI updates

**Key Files:**
- `app/login/page.tsx`
- `app/register/page.tsx`
- `hooks/useSupabaseAuth.ts`
- `lib/supabase.ts`

### 3. Favorites System

**Implementation:**
- Database-backed favorites using Supabase
- Real-time favorite status updates
- Favorites page for viewing saved posters
- Add/remove favorites from any poster view

**Data Flow:**
1. User clicks favorite button
2. `addFavorite()` or `removeFavorite()` called
3. Supabase updates favorites table
4. Local state updated for immediate feedback
5. Database serves as source of truth

**Key Files:**
- `services/favoriteService.ts`
- `components/PosterCard.tsx`
- `components/PosterDetail.tsx`
- `app/favorites/page.tsx`

### 4. Shopping Cart

**Implementation:**
- LocalStorage-based cart for persistence
- Quantity management (max 5 per poster)
- Cart page for review and checkout
- Order creation in Supabase

**Data Flow:**
1. User adds poster to cart
2. Cart stored in localStorage
3. Cart page reads from localStorage
4. User saves order (creates database record)
5. Cart cleared after successful order

**Why LocalStorage?**
- **Persistence**: Survives page refreshes
- **No Authentication Required**: Guest users can use cart
- **Simple**: No database overhead for temporary cart
- **Fast**: Instant access without network calls

**Key Files:**
- `app/cart/page.tsx`
- `components/PosterDetail.tsx`
- `services/orderService.ts`

### 5. Order Management

**Implementation:**
- Order creation in Supabase
- Order history tracking
- User-specific order retrieval
- Order status management

**Data Flow:**
1. User saves order from cart
2. `createOrder()` inserts order record
3. Order linked to user via user_id
4. Items stored as JSONB array
5. Total calculated from item prices

**Key Files:**
- `services/orderService.ts`
- `app/cart/page.tsx`

### 6. Dark Mode

**Implementation:**
- System preference detection
- Manual toggle override
- Persistent preference storage
- Tailwind CSS dark mode classes

**Data Flow:**
1. `useDarkMode` hook checks system preference
2. Checks localStorage for manual override
3. Applies dark mode class to document
4. Preference saved on toggle

**Key Files:**
- `hooks/useDarkMode.ts`
- `components/DarkModeToggle.tsx`
- `app/globals.css`

---

## Data Flow

### Poster Retrieval Flow

```
User Request
    ↓
Category Page (Server Component)
    ↓
getPostersByCategory() (Service Layer)
    ↓
Supabase Client
    ↓
Supabase PostgreSQL Database
    ↓
Poster Data
    ↓
normalizePosters() (Data Transformation)
    ↓
mergeWithSamplePosters() (Fallback Data)
    ↓
Rendered Page
```

**Why This Flow?**
- **Service Layer**: Centralized data access logic
- **Normalization**: Ensures consistent data structure
- **Fallback**: Sample data if database is unavailable
- **Server Rendering**: Faster initial load, better SEO

### Authentication Flow

```
User Action (Login/Register)
    ↓
Form Submission
    ↓
Supabase Auth API
    ↓
Credential Validation
    ↓
Session Token Generation
    ↓
Browser Storage (Cookie/LocalStorage)
    ↓
useSupabaseAuth Hook Detection
    ↓
State Update
    ↓
UI Re-render
```

**Why This Flow?**
- **Supabase Auth**: Secure, battle-tested authentication
- **Session Management**: Automatic token refresh
- **React Hook**: Centralized auth state
- **Real-time Updates**: Auth state changes trigger UI updates

### Favorite Toggle Flow

```
User Clicks Favorite Button
    ↓
Client Component Handler
    ↓
addFavorite() / removeFavorite() (Service)
    ↓
Supabase Database Update
    ↓
Local State Update (Optimistic UI)
    ↓
UI Re-render
```

**Why This Flow?**
- **Optimistic UI**: Immediate feedback before server response
- **Service Layer**: Centralized business logic
- **Database as Source of Truth**: Persistent storage
- **Local State**: Fast UI updates

---

## Authentication System

### Supabase Authentication

**Features Used:**
- Email/Password authentication
- Session management
- User metadata storage
- Row-Level Security (RLS)

### Authentication Implementation

#### Login Process
```typescript
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

**Steps:**
1. User submits email and password
2. Supabase validates credentials
3. Session token generated and stored
4. User redirected to home page
5. Auth state updated across app

#### Registration Process
```typescript
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      first_name: firstName,
      last_name: lastName,
      username,
    },
  },
});
```

**Steps:**
1. User submits registration form
2. Supabase creates user account
3. User metadata stored
4. Confirmation email sent (if configured)
5. User prompted to verify email

#### Session Management
```typescript
const { data } = await supabase.auth.getSession();
```

**Features:**
- Automatic token refresh
- Session persistence across page reloads
- Multi-tab synchronization
- Secure token storage

### Row-Level Security (RLS)

**Purpose:** Database-level access control

**Implementation:**
```sql
-- Example RLS policy for favorites
CREATE POLICY "Users can view own favorites"
ON favorites
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
ON favorites
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

**Benefits:**
- **Security**: Database enforces access rules
- **Simplicity**: No application-level checks needed
- **Performance**: Queries filtered at database level
- **Reliability**: Cannot bypass security rules

---

## State Management

### Local State (React useState)

**Usage:**
- Component-specific state
- Form inputs
- UI toggles
- Loading states

**Example:**
```typescript
const [posters, setPosters] = useState<Poster[]>([]);
const [loading, setLoading] = useState(true);
```

### Global State (React Context + Hooks)

**Usage:**
- Authentication state
- Dark mode preference
- Cart state (via localStorage)

**Example:**
```typescript
const { user, session, loading } = useSupabaseAuth();
```

### Persistent State (localStorage)

**Usage:**
- Shopping cart
- Dark mode preference
- User preferences

**Why localStorage?**
- **Persistence**: Survives page refreshes
- **No Server Required**: Works offline
- **Simple**: Easy to implement
- **Fast**: Instant access

### Server State (Supabase)

**Usage:**
- Poster data
- User favorites
- Order history
- User profiles

**Why Supabase?**
- **Real-time**: Live updates
- **Secure**: Built-in authentication
- **Scalable**: Handles growth
- **Queryable**: Powerful filtering and sorting

---

## Component Structure

### Component Hierarchy

```
RootLayout
├── Navbar
│   ├── DarkModeToggle
│   └── AuthWidget
└── Page Content
    ├── Home Page
    │   ├── Hero
    │   ├── TrendingSection
    │   │   └── PosterCard[]
    │   └── CategoriesSection
    │       └── CategoryCard[]
    ├── Category Page
    │   └── PosterCard[]
    ├── Poster Detail Page
    │   └── PosterDetail
    ├── Favorites Page
    │   └── PosterCard[]
    ├── Cart Page
    │   └── Cart Items
    ├── Login Page
    └── Register Page
```

### Component Patterns

#### Container Components
- Handle data fetching
- Manage state
- Pass data to presentational components

#### Presentational Components
- Receive data via props
- Focus on UI rendering
- No business logic

**Example:**
- `TrendingSection` (Container)
- `PosterCard` (Presentational)

### Reusable Components

#### PosterCard
**Props:**
- `poster`: Poster data
- `isFavorite`: Favorite status
- `onToggleFavorite`: Favorite toggle handler
- `detailUrl`: Link to detail page

**Usage:**
- Trending section
- Category pages
- Favorites page

**Why Reusable?**
- Single source of truth for poster display
- Consistent UI across app
- Easy to maintain and update

#### CategoryCard
**Props:**
- `title`: Category name
- `description`: Category description

**Usage:**
- Categories section
- Category overview page

---

## API Integration

### Supabase Client Configuration

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Why Environment Variables?**
- **Security**: Credentials not in code
- **Flexibility**: Different configs per environment
- **Best Practice**: Industry standard for secrets

### Service Layer Functions

#### getPosters()
```typescript
export async function getPosters() {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,section,creator,image_url,created_at");

  if (error || !data || data.length === 0) {
    return samplePosters; // Fallback
  }

  return mergeWithSamplePosters(normalizePosters(data), samplePosters);
}
```

**Features:**
- Error handling
- Fallback to sample data
- Data normalization
- Merging with sample data

#### getPostersByCategory()
```typescript
export async function getPostersByCategory(category: string) {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,section,creator,image_url,created_at")
    .eq("category", category);

  if (error || !data) {
    return samplePosters.filter(/* ... */);
  }

  return mergeWithSamplePosters(normalizePosters(data), fallbackPosters);
}
```

**Features:**
- Category filtering
- Case-insensitive matching
- Fallback data
- Data normalization

### Error Handling Strategy

**Service Layer:**
- Log unexpected errors
- Return fallback data
- Don't crash on API failures

**Component Layer:**
- Display loading states
- Show error messages
- Provide retry options

**Why This Strategy?**
- **Resilience**: App works even with API failures
- **User Experience**: Graceful degradation
- **Debugging**: Errors logged for investigation

---

## Performance Optimization

### Next.js Optimizations

#### Server Components
- Reduce client-side JavaScript
- Faster initial page load
- Better SEO

#### Image Optimization
```typescript
<Image
  src={poster.image_url}
  alt={poster.title}
  width={500}
  height={700}
  className="h-[500px] w-full object-cover"
/>
```

**Benefits:**
- Automatic resizing
- Modern format conversion (WebP)
- Lazy loading
- Responsive images

#### Code Splitting
- Automatic route-based splitting
- Dynamic imports for large components
- Reduced initial bundle size

### Supabase Optimizations

#### Query Optimization
```typescript
.select("id,title,category,section,creator,image_url,created_at")
```

**Benefits:**
- Only select needed columns
- Reduce data transfer
- Faster query execution

#### Indexing
- Primary key indexes
- Category indexes
- User ID indexes

#### Connection Pooling
- Managed by Supabase
- Automatic scaling
- Efficient resource usage

### Frontend Optimizations

#### Lazy Loading
- Images loaded on scroll
- Components loaded when needed
- Reduced initial load time

#### Memoization
```typescript
const total = useMemo(
  () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  [cartItems]
);
```

**Benefits:**
- Avoid unnecessary recalculations
- Improved render performance
- Better user experience

#### Optimistic UI Updates
- Update UI immediately
- Sync with server in background
- Perceived faster performance

---

## Security Considerations

### Authentication Security

#### Supabase Auth
- Secure session management
- Token-based authentication
- Automatic token refresh
- Secure token storage

#### Password Security
- Passwords never stored in plain text
- Hashed by Supabase
- Secure transmission (HTTPS)

### Data Security

#### Row-Level Security
- Database-level access control
- Users can only access their data
- Cannot bypass security rules

#### Environment Variables
- Secrets not in code
- Different configs per environment
- Never committed to git

### API Security

#### Anon Key Usage
- Public key for client-side access
- Restricted by RLS policies
- Can be revoked if compromised

#### SQL Injection Prevention
- Parameterized queries (Supabase)
- No raw SQL execution
- Type-safe queries

### Client-Side Security

#### XSS Prevention
- React automatically escapes content
- No dangerous innerHTML usage
- Sanitized user inputs

#### CSRF Protection
- Supabase handles CSRF
- SameSite cookie attributes
- Token-based authentication

---

## Deployment

### Environment Setup

#### Required Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### Deployment Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

### Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Deployment Steps

1. **Push Code to Repository**
   - Git version control
   - CI/CD pipeline integration

2. **Configure Environment Variables**
   - Add Supabase credentials
   - Set environment-specific configs

3. **Build Application**
   - Next.js build process
   - Asset optimization
   - Code splitting

4. **Deploy to Platform**
   - Platform-specific deployment
   - Automatic SSL certificates
   - CDN distribution

5. **Monitor Performance**
   - Error tracking
   - Performance monitoring
   - User analytics

---

## Future Enhancements

### Planned Features

#### Search Functionality
- Full-text search for posters
- Filter by multiple criteria
- Search suggestions
- Search history

#### Payment Integration
- Stripe integration
- Multiple payment methods
- Order confirmation emails
- Receipt generation

#### User Profiles
- Profile customization
- Order history
- Address management
- Payment methods

#### Social Features
- Share posters on social media
- User reviews and ratings
- Community collections
- Follow other users

#### Admin Dashboard
- Poster management
- Order management
- User management
- Analytics dashboard

### Technical Improvements

#### Performance
- Implement Redis caching
- Add service workers for offline support
- Optimize bundle size further
- Implement edge functions

#### Testing
- Unit tests for services
- Integration tests for API
- E2E tests with Playwright
- Visual regression testing

#### Monitoring
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- User behavior analytics
- Uptime monitoring

#### Accessibility
- ARIA labels improvement
- Keyboard navigation
- Screen reader optimization
- Color contrast compliance

---

## Conclusion

VibePrints demonstrates a modern, scalable approach to building e-commerce applications using Next.js and Supabase. The architecture prioritizes performance, security, and developer experience while providing a seamless user experience.

### Key Takeaways

1. **Modern Stack**: Next.js + Supabase provides a powerful, scalable foundation
2. **Service Layer**: Separation of concerns improves maintainability
3. **Type Safety**: TypeScript catches errors early
4. **Performance**: Server components and optimizations ensure fast loads
5. **Security**: Supabase RLS and auth provide robust security
6. **Scalability**: Architecture supports future growth and features

### Best Practices Demonstrated

- Component-based architecture
- Service layer pattern
- Custom hooks for reusable logic
- Environment variable security
- Error handling and fallbacks
- Performance optimization
- Type safety with TypeScript
- Responsive design with Tailwind

This documentation serves as a comprehensive guide for understanding, maintaining, and extending the VibePrints application.
