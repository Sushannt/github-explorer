# GitHub Explorer

A mobile-first web application that lets you search GitHub users and explore their public profiles and repositories. Built with Next.js 16 App Router, it uses server components to fetch data directly from the GitHub REST API — no client-side fetching required. Users can search by username, browse enriched result cards with bio and follower counts, and drill into a profile page showing paginated, sortable repositories with language badges and star counts.

---

## Live Demo

[https://github-profile-explor.netlify.app](https://github-profile-explor.netlify.app)

---

## Tech Stack

| Tool | Why |
|---|---|
| **Next.js 16 (App Router)** | Server components fetch data at request time with no client JS overhead; file-based routing and API routes in one project |
| **TypeScript** | End-to-end type safety across GitHub API shapes and internal app types |
| **Tailwind CSS v4** | Utility-first styling with mobile-first responsive design out of the box |
| **shadcn/ui** | Accessible, unstyled-first component primitives that are easy to theme |
| **Bun** | Faster installs and script execution than npm/yarn |
| **Phosphor Icons + Lucide React** | Comprehensive icon sets with consistent visual weight |
| **GitHub REST API v3** | Public API, no OAuth required for read-only user and repo data |

**Caching:** All GitHub API calls use Next.js fetch-level caching (`next: { revalidate: 60 }`). Responses are cached for 60 seconds per unique URL — profile, page, and sort combination.

---

## How to Run Locally

> Assumes Node.js ≥ 18 is installed. Bun is used as the package manager.

**1. Install Bun**
```bash
npm install -g bun
```

**2. Clone and install dependencies**
```bash
git clone https://github.com/Sushannt/github-explorer.git
cd github-explorer
bun install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```

Open `.env.local` and add your GitHub personal access token (optional but recommended — raises the rate limit from 60 to 5,000 requests/hour):
```
GITHUB_TOKEN=your_token_here
```

**4. Start the development server**
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

**5. Production build**
```bash
bun run build
bun start
```

---

## API Documentation

All endpoints are internal Next.js API routes. They call the GitHub REST API server-side and return mapped internal types — raw GitHub shapes are never exposed to the client.

---

### `GET /api/search`

Search GitHub users by username.

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | Username or keyword to search |
| `page` | number | no | Page number, defaults to `1` |

**Response** `200 OK`
```json
{
  "users": [
    {
      "username": "torvalds",
      "avatar": "https://avatars.githubusercontent.com/u/1024025",
      "profileUrl": "https://github.com/torvalds",
      "bio": "...",
      "location": "Portland, OR",
      "followers": 230000,
      "publicRepos": 8
    }
  ],
  "totalCount": 142,
  "page": 1
}
```

**Error Responses**

| Status | Condition |
|---|---|
| `400` | `query` is missing or empty |
| `500` | GitHub API failure |

---

### `GET /api/profile`

Fetch a user's profile and paginated repository list.

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `username` | string | yes | GitHub username |
| `page` | number | no | Page number, defaults to `1` |
| `sort` | string | no | `updated` (default), `name`, or `stars` |

**Response** `200 OK`
```json
{
  "profile": {
    "username": "torvalds",
    "name": "Linus Torvalds",
    "avatar": "https://avatars.githubusercontent.com/u/1024025",
    "bio": "...",
    "location": "Portland, OR",
    "followers": 230000,
    "following": 0,
    "publicRepos": 8
  },
  "repos": [
    {
      "name": "linux",
      "description": "Linux kernel source tree",
      "language": "C",
      "stars": 180000,
      "url": "https://github.com/torvalds/linux",
      "fork": false,
      "updatedAt": "2024-06-01T00:00:00Z"
    }
  ],
  "totalRepos": 8
}
```

**Error Responses**

| Status | Condition |
|---|---|
| `400` | `username` is missing or empty |
| `404` | GitHub user not found |
| `500` | GitHub API failure |

---

## Project Structure

```
app/
├── page.tsx                    # Home — search form
├── layout.tsx                  # Root layout
├── (internal)/                 # Route group (shared header + container)
│   ├── search/[query]/         # Search results page, skeleton, error boundary
│   └── profile/[username]/     # Profile + repo listing page, skeleton, error boundary
└── api/
    ├── search/route.ts         # GET /api/search
    ├── profile/route.ts        # GET /api/profile
    └── github/                 # Raw GitHub REST API callers (caching lives here)

components/
├── home/                       # Search form, quick-search chips
├── search/                     # User search card, pagination controls
├── profile/                    # Profile card, repo card, sort controls, skeletons
└── ui/                         # shadcn/ui primitives — do not edit directly

lib/
├── data/
│   ├── profile.ts              # Fetches + maps user profile and repos
│   └── search.ts               # Fetches + maps search results
├── api.utls.ts                 # JSONResponse helper, unwrap() Go-style async tuple
├── fetchers.ts                 # Page-level wrappers around lib/data (used by server components)
├── constants.ts                # GitHub API base URL, pagination sizes
├── github-headers.ts           # Attaches GITHUB_TOKEN to outgoing requests
├── language-colors.ts          # Language name → hex color for repo badges
└── utils.ts                    # cn() Tailwind class merge helper

types/
├── user.type.ts                # IGitHubUser, IUserProfile, IProfileResponse
├── repo.type.ts                # IGitHubRepo, IRepo
└── search.type.ts              # IGitHubSearchItem, IGitHubSearchResponse, IUserSearchResult, ISearchResponse
```

---

## Next Steps

**What was intentionally skipped**
- Recently searched list — persisting search history in `localStorage` was deferred; the quick-search chips on the home page serve as a lightweight substitute for now
- Language breakdown chart — the language data is already fetched per repo; a pie/bar chart aggregating it across the profile was cut for time
- Debounced search-as-you-type — all search is currently form-submit driven via a Server Action; live typeahead would require a client-side fetch layer and debounce logic

**What I would build next**
- Implement the three skipped features above
- Show followers and following lists on the profile page
- Infinite scroll or cursor-based pagination instead of numbered pages
- End-to-end tests with Playwright covering the search → profile flow
