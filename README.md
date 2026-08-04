# Mohamed Magdy — Portfolio

A feature-based full-stack monorepo for Mohamed Magdy's portfolio.

## Structure

```
frontend/            Next.js 14 app (deployed to Vercel: mohamed-magdy)
  pages/             Routes
  features/          Frontend feature slices
    profile/         Hero / intro / avatar
    about/
    skills/
    experience/
    certifications/
    contact/
    blog/
    admin/           Admin panel UI (SectionEditor, BlogManager, Login)
    layout/          TopNav, Footer
    _shared/         API client + default content
  public/            Static assets
backend/             Express + Mongoose API (deployed to Vercel: portfolio-backend)
  features/          Backend feature slices
    content/         Content store + seed + routes
    blog/            Blog model/service + routes
    admin/           Admin auth + routes
    _shared/         MongoDB connection
  api/index.js       Serverless entry
  server.js          Local Express server
```

Each feature is self-contained within its side; shared infrastructure lives in
`_shared`. The two sides are deployed as separate Vercel apps (the backend
deployment is rooted at `backend/`), so frontend feature slices live in
`frontend/features/` and backend slices in `backend/features/`.

## Development

```bash
# frontend (http://localhost:3000)
npm run dev

# backend (http://localhost:5000)
npm run backend
```

## Deployment

```bash
# frontend
cd frontend && npx vercel --prod

# backend
cd backend && npx vercel --prod
```

## Environment

- `frontend/.env.local` — `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_EMAILJS_*`
- `backend/.env` — `MONGODB_URI`, `ADMIN_PASSWORD`, `ADMIN_SECRET`
