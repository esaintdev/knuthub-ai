# Knuthub AI - AI Content Generation Platform

A full-featured SaaS platform that auto-generates marketing content (website copy, social posts, ads, email sequences) for small businesses using Google Gemini AI.

## Features

- 🤖 **AI-Powered Content Generation** - Generate professional marketing content in seconds using Google Gemini 2.5 Pro
- 🎯 **Niche Targeting** - Specialized for churches, restaurants, salons, and chauffeur services
- 📝 **Multiple Content Types**:
  - Website content (homepage, about, services, contact)
  - Social media posts (Instagram, Facebook, LinkedIn, Twitter)
  - Ad copy (Google Ads, Facebook Ads)
  - Email sequences (welcome, promotional, nurture)
- 🏢 **Brand Management** - Create and manage multiple brand profiles
- 📊 **Usage Tracking** - Monitor your monthly content generation quota
- 💳 **Subscription Plans** - Flexible pricing from £10-£49/month
- 👨‍💼 **Admin Panel** - Comprehensive admin dashboard for platform management
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support

## Tech Stack

- **Framework**: Next.js 16 (App Router) with Turbopack
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js v5
- **AI**: Google Gemini AI (`@google/genai`)
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons

## Prerequisites

- Node.js 18.17+ installed
- A Supabase account and project
- A Google AI API key (for Gemini)
- (Optional) Paystack account for payment processing

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# NextAuth (Generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google Gemini AI
GOOGLE_AI_API_KEY="your-google-ai-api-key"

# Paystack (Optional)
PAYSTACK_SECRET_KEY="sk_test_your_key"
PAYSTACK_PUBLIC_KEY="pk_test_your_key"
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_your_key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set Up the Database

Run the SQL scripts in your Supabase SQL Editor:

1. Run `supabase-schema.sql` - Creates all tables and relationships
2. Run `supabase-admin-additions.sql` - Adds admin functionality

### 4. Create an Admin User

Run the helper script:

```bash
node create-admin.js
```

Follow the prompts, then copy the generated SQL and run it in Supabase SQL Editor.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting Your API Keys

### Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → API
4. Copy the Project URL and anon/public key

### Google Gemini AI

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Create an API key
3. Add it to `GOOGLE_AI_API_KEY`

### Paystack (Optional)

1. Go to [paystack.com](https://paystack.com)
2. Sign up and get your test keys from Settings → API Keys & Webhooks

## Usage

### For Users

1. **Sign Up** - Create an account at `/signup`
2. **Create Brand** - Add your business details in the Brands section
3. **Generate Content** - Select brand, content type, and generate
4. **View Library** - Access all generated content in Content Library
5. **Manage Billing** - View subscription and usage in Billing

### For Admins

1. **Access Admin Panel** - Navigate to `/admin` (requires admin role)
2. **Dashboard** - View platform statistics and metrics
3. **User Management** - View and manage all users
4. **Subscriptions** - Monitor all subscriptions and revenue
5. **Content Moderation** - Review all generated content
6. **Settings** - Configure platform settings

## Project Structure

```
ai-content/
├── app/
│   ├── (admin)/             # Admin panel pages
│   │   └── admin/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/         # User dashboard pages
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
│   └── page.tsx             # Landing page
├── components/
│   ├── layout/              # Layout components
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── prompts/             # AI prompt templates
│   ├── gemini.ts            # Gemini AI integration
│   ├── supabase.ts          # Supabase client
│   ├── usage.ts             # Usage tracking
│   └── utils.ts             # Utility functions
├── types/
│   └── next-auth.d.ts       # NextAuth type extensions
├── supabase-schema.sql      # Database schema
├── supabase-admin-additions.sql  # Admin features
└── create-admin.js          # Admin user creator
```

## Database Schema

### Main Tables

- **users** - User accounts with role-based access
- **brands** - Business brand profiles
- **contents** - Generated content pieces
- **subscription_plans** - Available subscription tiers
- **subscriptions** - User subscriptions
- **usage** - Monthly usage tracking

### Key Features

- Row Level Security (RLS) enabled
- Automatic timestamps with triggers
- Foreign key relationships
- JSON metadata support

## Subscription Plans

- **Starter** (£10/month): 50 generations, 1 brand
- **Professional** (£29/month): 200 generations, 3 brands
- **Business** (£49/month): Unlimited generations, 10 brands

## Development Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm start            # Start production server

# Utilities
npm run lint         # Run ESLint
node create-admin.js # Create admin user
```

## Admin Panel Features

- **Dashboard**: Platform statistics, recent users, system health
- **User Management**: View all users, roles, and registration dates
- **Subscription Management**: Track active subscriptions and MRR
- **Content Moderation**: Review and manage all generated content
- **System Settings**: Configure maintenance mode, API status, danger zone actions

## Security Features

- NextAuth.js v5 for authentication
- Row Level Security (RLS) in Supabase
- Role-based access control (admin/user)
- Bcrypt password hashing
- Protected API routes
- Middleware for route protection

## Migration Notes

This project has been fully migrated from Prisma to direct Supabase integration:
- All database queries use `@supabase/supabase-js`
- Column naming follows PostgreSQL snake_case convention
- Authentication uses NextAuth with Supabase backend
- No Prisma dependencies remain

## Troubleshooting

### Content Generation Issues

If content generation fails:
1. Verify `GOOGLE_AI_API_KEY` is set correctly
2. Check network connectivity to Google APIs
3. Ensure model name is valid (`gemini-2.5-pro`)
4. Review server logs for detailed error messages

### Database Connection

If database queries fail:
1. Verify Supabase URL and anon key
2. Check RLS policies are correctly set
3. Ensure SQL scripts have been run
4. Verify user has proper permissions

## Future Enhancements

- [ ] Paystack payment integration
- [ ] Email verification for signups
- [ ] Content export in multiple formats
- [ ] Advanced analytics dashboard
- [ ] API rate limiting
- [ ] Automated testing suite
- [ ] Multi-language support

## Support

For issues or questions, please create an issue in the repository.

## License

© 2024 Knuthub AI. All rights reserved.
