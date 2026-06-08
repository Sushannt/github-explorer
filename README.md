# GitHub Explorer

A mobile-first web app to search and explore GitHub user profiles and their public repositories.

## Features

- **User search** — search GitHub users by username with paginated results
- **Enriched search cards** — each result shows bio, location, follower count, and public repo count
- **Profile page** — view a user's full profile with avatar, stats, and all public repositories
- **Repository listing** — paginated repo list with language badges, star counts, last updated time, and links
- **Repo sorting** — sort repositories by last updated, name, or star count
- **Mobile-first layout** — designed for small screens, progressively enhanced for larger ones

## Caching Strategy

All GitHub API calls use Next.js fetch-level caching via `next: { revalidate: 60 }`:

- User profiles and repo lists are cached for **60 seconds** at the fetch level
- Each unique URL (user + page + sort) is cached independently
- Cache misses hit the GitHub REST API; hits are served from Next.js's data cache
- Server Actions and API routes act as a boundary — raw GitHub shapes are mapped to internal types before reaching the client

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **UI primitives** — shadcn/ui
- **Runtime / package manager** — Bun
- **Icons** — Phosphor Icons, Lucide React
- **Data** — GitHub REST API v3

## Project Structure

```
app/
├── page.tsx                        # Home page — search form
├── layout.tsx                      # Root layout
├── (internal)/                     # Route group for search + profile pages
│   ├── layout.tsx                  # Shared header and container padding
│   ├── search/
│   │   ├── page.tsx                # Redirects to /search/[query]
│   │   └── [query]/
│   │       ├── page.tsx            # Search results page
│   │       ├── loading.tsx         # Skeleton while fetching
│   │       └── error.tsx           # Error boundary
│   └── profile/[username]/
│       ├── page.tsx                # Profile + repo listing page
│       ├── loading.tsx
│       └── error.tsx
└── api/
    ├── search/route.ts             # GET /api/search — searches users, enriches with profile data
    ├── profile/route.ts            # GET /api/profile — fetches user + repos, maps to internal types
    └── github/                     # Raw GitHub API callers (fetch + revalidate live here)
        ├── get-user.ts
        ├── get-user-repos.ts
        └── search-users.ts

components/
├── home/                           # Search form and quick-search suggestions
├── search/                         # Search result card, pagination controls
├── profile/                        # Profile card, repo card, sort controls, skeletons, errors
└── ui/                             # shadcn/ui primitives (Button, Badge, Card, Skeleton, etc.)

lib/
├── api.utls.ts                     # JSONResponse helper, unwrap() Go-style async tuple
├── fetchers.ts                     # Client-side fetch wrappers for /api/search and /api/profile
├── constants.ts                    # API base URL, pagination size
├── github-headers.ts               # Builds Authorization header from GITHUB_TOKEN
├── language-colors.ts              # Language → color map for repo badges
├── trail.ts                        # Utility for breadcrumb trails
└── utils.ts                        # cn() class merge helper

types/
├── user.type.ts                    # IGitHubUser, IUserProfile, IProfileResponse
├── repo.type.ts                    # IGitHubRepo, IRepo
└── search.type.ts                  # IGitHubSearchItem, IGitHubSearchResponse, IUserSearchResult, ISearchResponse
```

- `app/api/github/` is the only place that touches raw GitHub API responses
- `app/api/*/route.ts` maps raw shapes to internal types before returning JSON
- `components/ui/` is managed by shadcn — don't edit directly; use `bunx shadcn add <component>`

## Getting Started

```bash
bun install
bun dev        # http://localhost:3000
```

For production:

```bash
bun run build
bun start
```

Set `GITHUB_TOKEN` in your environment to raise the GitHub API rate limit from 60 to 5,000 requests/hour.
