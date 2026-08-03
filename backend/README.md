# Portfolio Backend

Express + MongoDB (Mongoose) API that serves and manages the portfolio content for the Next.js frontend. The admin dashboard at `/admin` reads and writes this data.

## API

| Method | Endpoint              | Description                                      | Auth        |
| ------ | --------------------- | ------------------------------------------------ | ----------- |
| GET    | `/api/health`         | Health check (status + uptime)                   | –           |
| GET    | `/api/content`        | All content sections (merged over defaults)      | –           |
| GET    | `/api/blogs`          | Published blog posts (newest first)              | –           |
| GET    | `/api/blogs/:slug`    | A single published blog post                     | –           |
| POST   | `/api/admin/login`    | Login with `ADMIN_PASSWORD`, returns JWT         | –           |
| PUT    | `/api/admin/content/:key` | Update a section (`hero`, `about`, `skills`, `experience`, `contact`, `blog`, `site`) | `Bearer <token>` |
| GET    | `/api/admin/blogs`    | All posts, including drafts                      | `Bearer <token>` |
| POST   | `/api/admin/blogs`    | Create a blog post (slug auto-generated from title if omitted) | `Bearer <token>` |
| PUT    | `/api/admin/blogs/:id` | Update a blog post                              | `Bearer <token>` |
| DELETE | `/api/admin/blogs/:id` | Delete a blog post                              | `Bearer <token>` |

If MongoDB is unreachable or `MONGODB_URI` is missing, `GET /api/content` falls back to the built-in defaults in `lib/defaultContent.js` instead of failing.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in your values
npm run dev            # or: npm start
```

Environment variables (`backend/.env`):

- `PORT` – server port (default `5000`)
- `MONGODB_URI` – MongoDB connection string (e.g. Atlas)
- `ADMIN_PASSWORD` – password accepted by `/api/admin/login`
- `ADMIN_SECRET` – secret used to sign/verify admin JWTs

The frontend reads `NEXT_PUBLIC_API_URL` (default `http://localhost:5000`) and expects this backend to be reachable at that origin.

## Deploying

The backend is a standalone Node service and deploys independently of the Vercel frontend. On Render/Railway, set the build command to `npm install` and start command to `npm start`, then add the four environment variables above. Keep `NEXT_PUBLIC_API_URL` on the frontend pointed at the deployed backend URL.
