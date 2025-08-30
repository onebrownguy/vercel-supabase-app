# Next.js 15 + Supabase Full-Stack Setup Guide

## 🚀 Quick Setup

### 1. Supabase Project Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be ready (2-3 minutes)
3. Go to Settings → API and copy your:
   - Project URL
   - Public anon key
   - Service role key (for admin operations)

### 2. Environment Configuration
Update `.env.local` with your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Database Schema Setup
Copy the SQL from `supabase/migrations/001_initial_schema.sql` and run it in your Supabase SQL Editor:

1. Go to your Supabase dashboard
2. Click "SQL Editor" in the left sidebar
3. Paste the entire contents of the migration file
4. Click "Run" to execute the schema creation

### 4. Install Dependencies & Run
```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/route.ts          # Authentication endpoints
│   │   └── posts/
│   │       ├── route.ts           # Posts CRUD operations
│   │       └── [id]/route.ts      # Individual post operations
│   ├── layout.tsx
│   └── page.tsx                   # Main page with auth demo
├── components/
│   ├── AuthForm.tsx               # Login/signup form
│   └── PostsList.tsx              # Posts display component
├── lib/
│   ├── supabase.ts                # Supabase client config
│   └── auth.ts                    # Authentication helpers
└── types/
    └── database.ts                # TypeScript database types
```

## 🔐 Database Schema

### Tables Created:
- **users**: Extends Supabase auth with additional user data
- **profiles**: User profiles with username, bio, etc.
- **posts**: Blog-style posts with content and metadata

### Features:
- ✅ Row Level Security (RLS) enabled
- ✅ Automatic user profile creation on signup
- ✅ Foreign key relationships
- ✅ Optimized indexes
- ✅ Auto-updating timestamps

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth` | Get current authenticated user |
| POST | `/api/auth` | Sign in or sign up user |
| GET | `/api/posts` | List all published posts |
| POST | `/api/posts` | Create new post (auth required) |
| GET | `/api/posts/[id]` | Get specific post |
| PUT | `/api/posts/[id]` | Update post (owner only) |
| DELETE | `/api/posts/[id]` | Delete post (owner only) |

## 🔧 Development Features

- **Next.js 15** with App Router
- **React 19** for latest features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Supabase** for backend services
- **Row Level Security** for data protection
- **Real-time subscriptions** ready
- **Authentication** with email/password
- **API routes** with proper error handling

## 🚢 Deployment

### Vercel Deployment:
```bash
# Connect to Vercel
vercel

# Add environment variables in Vercel dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY  
# - SUPABASE_SERVICE_ROLE_KEY

# Deploy
vercel --prod
```

### Environment Variables:
Make sure to add all environment variables in your Vercel dashboard under Settings → Environment Variables.

## 🧪 Testing the Backend

1. **Authentication**: Use the sign up form to create an account
2. **Database**: Check the users and profiles tables in Supabase
3. **API Routes**: Test endpoints with curl or Postman
4. **Real-time**: Posts should appear immediately after creation

## 📚 Next Steps

- [ ] Add file upload for user avatars
- [ ] Implement real-time subscriptions
- [ ] Add user roles and permissions
- [ ] Create admin dashboard
- [ ] Add email verification
- [ ] Implement social login (Google, GitHub)
- [ ] Add post categories and tags
- [ ] Create search functionality

## 🔍 Troubleshooting

**Common Issues:**
- **RLS Error**: Make sure you're authenticated when accessing protected data
- **CORS Issues**: Ensure your Supabase URL is correct in environment variables
- **Type Errors**: Run `npm run build` to check for TypeScript issues

**Useful Commands:**
```bash
npm run build          # Check for build errors
npm run lint           # Run ESLint
npm run type-check     # TypeScript checking
```