# Setup Instructions - Supabase Direct Connection

## ✅ Prisma Removed - Using Supabase Directly

I've removed Prisma and set up the project to connect directly to Supabase. This is much simpler!

## Step 1: Run the SQL Script in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/xckjrjtshhcxhavbsdlm
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql`
5. Paste it into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

This will create all the tables, indexes, and insert the subscription plans.

## Step 2: Get Your Supabase Keys

1. In your Supabase dashboard, go to **Project Settings** → **API**
2. Copy these two values:
   - **Project URL**: `https://xckjrjtshhcxhavbsdlm.supabase.co` (already in `.env`)
   - **anon/public key**: Copy this and add to `.env`

## Step 3: Update Your .env File

Open `.env` and update:

```env
NEXT_PUBLIC_SUPABASE_URL="https://xckjrjtshhcxhavbsdlm.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="paste-your-anon-key-here"
GOOGLE_AI_API_KEY="your-google-ai-key-here"
```

## Step 4: Run the App

```bash
npm run dev
```

Open http://localhost:3000

## What's Different?

- ❌ No more Prisma
- ❌ No more `npm run db:push`
- ✅ Direct Supabase connection
- ✅ Simple SQL script to run once
- ✅ Easier to manage

## Need Help?

If you have any issues:
1. Make sure the SQL script ran successfully (check for errors in Supabase)
2. Verify your anon key is correct
3. Check that your Google AI API key is set
