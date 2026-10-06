# Restaurant Portal

A modern, responsive, and secure web application for restaurant management, built with Next.js and React.js.

## Features Completed (Based on BRD)
- **1-4. Authentication:** Login, Registration, Password field visibility, Remember me, Form validation.
- **5. UI Layout:** Hero Section, Header with Search/Profile, Collapsible Left Sidebar.
- **6-7. Functional & Non-Functional:** Fast, responsive UI, secure client-side protection for routes.
- **8. Technology Stack:** React.js + Next.js
- **9. Database:** Supabase setup initialized (requires connection strings).
- **10. Deployment:** Production-ready build is configured, ready for Vercel deployment.

## Next Steps for You

### 1. Database Integration (Supabase)
To store user data securely, we have set up Supabase. 
1. Go to [Supabase](https://supabase.com) and create a new project.
2. Get your `URL` and `anon key` from the project settings.
3. Open the `.env.local` file in this project and paste them:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### 2. Deployment (Vercel)
The app is production-ready. To deploy it online so the public can access it:
1. Push this code to a new repository on GitHub.
2. Go to [Vercel](https://vercel.com) and click "Add New Project".
3. Import your GitHub repository.
4. In the Environment Variables section on Vercel, add the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Click **Deploy**. Vercel will automatically build (`npm run build`) and host your website online.
