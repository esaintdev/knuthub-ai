# AI Content Generation Platform

A full-featured SaaS platform that auto-generates marketing content (website copy, social posts, ads, email sequences) for small businesses using Google Gemini AI.

## Features

- 🤖 **AI-Powered Content Generation** - Generate professional marketing content in seconds
- 🎯 **Niche Targeting** - Specialized for churches, restaurants, salons, and chauffeur services
- 📝 **Multiple Content Types**:
  - Website content (homepage, about, services, contact)
  - Social media posts (Instagram, Facebook, LinkedIn, Twitter)
  - Ad copy (Google Ads, Facebook Ads)
  - Email sequences (welcome, promotional, nurture)
- 🏢 **Brand Management** - Create and manage multiple brand profiles
- 📊 **Usage Tracking** - Monitor your monthly content generation quota
- 💳 **Subscription Plans** - Flexible pricing from £10-£49/month
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **AI**: Google Gemini AI
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account and project
- A Google AI API key (for Gemini)
- (Optional) Paystack account for payment processing

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd /Users/mac/Documents/NextJs/ai-content
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp env.example .env
```

Edit `.env` and add your credentials:

```env
# Database (Get from Supabase)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# NextAuth (Generate secret with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google Gemini AI
GOOGLE_AI_API_KEY="your-google-ai-api-key"

# Paystack (Optional for now)
PAYSTACK_SECRET_KEY="sk_test_your_key"
PAYSTACK_PUBLIC_KEY="pk_test_your_key"
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_your_key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set Up the Database

Push the Prisma schema to your database:

```bash
npm run db:push
```

Seed the database with subscription plans:

```bash
npx prisma db seed
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting Your API Keys

### Supabase Database

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → Database
4. Copy the connection string and add it to `DATABASE_URL`

### Google Gemini AI

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to `GOOGLE_AI_API_KEY`

### Paystack (Optional)

1. Go to [paystack.com](https://paystack.com)
2. Sign up and get your test keys
3. Add them to the Paystack environment variables

## Usage

### 1. Create an Account

- Navigate to `/signup`
- Create an account with email and password
- You'll automatically get a 14-day trial with the Starter plan

### 2. Create a Brand Profile

- Go to "Brands" in the dashboard
- Click "Create Brand"
- Fill in your business details:
  - Business name
  - Industry/niche
  - Brand tone
  - Target audience
  - Unique selling points
  - Services/products

### 3. Generate Content

- Go to "Generate" in the dashboard
- Select your brand
- Choose content type (website, social, ads, email)
- Choose specific type (e.g., Instagram post, homepage)
- Add optional context
- Click "Generate Content"
- Copy and use your generated content!

### 4. View Content Library

- Go to "Content Library" to see all your generated content
- Filter by type and brand
- Edit or delete content as needed

## Project Structure

```
ai-content/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── dashboard/
│   │   ├── brands/
│   │   ├── generate/
│   │   ├── content/
│   │   └── billing/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── brands/
│   │   ├── content/
│   │   └── generate/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Landing page
├── components/
│   ├── layout/              # Layout components
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── prompts/             # AI prompt templates
│   ├── gemini.ts            # Gemini AI integration
│   ├── prisma.ts            # Prisma client
│   ├── usage.ts             # Usage tracking
│   └── utils.ts             # Utility functions
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding
├── types/
│   └── index.ts             # TypeScript types
└── middleware.ts            # Route protection

```

## Database Schema

The application uses the following main models:

- **User** - User accounts and authentication
- **Brand** - Business brand profiles
- **Content** - Generated content pieces
- **SubscriptionPlan** - Available subscription tiers
- **Subscription** - User subscriptions
- **Usage** - Monthly usage tracking

## Subscription Plans

- **Starter** (£10/month): 50 generations, 1 brand
- **Professional** (£29/month): 200 generations, 3 brands
- **Business** (£49/month): Unlimited generations, 10 brands

## Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Push database schema
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database
npx prisma db seed

# Run linter
npm run lint
```

## Next Steps

1. **Add Paystack Integration** - Implement payment processing for subscriptions
2. **Email Verification** - Add email verification for new signups
3. **Content Editing** - Add inline editing for generated content
4. **Export Features** - Allow exporting content in various formats
5. **Analytics** - Add usage analytics and insights
6. **API Rate Limiting** - Implement rate limiting for API routes
7. **Testing** - Add unit and integration tests

## Support

For issues or questions, please contact support or create an issue in the repository.

## License

© 2024 ContentAI. All rights reserved.
