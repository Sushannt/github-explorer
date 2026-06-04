Since you're using Next.js for both frontend and backend, I'd structure this as a small but production-minded application with clear milestones.

# MVP Scope

## Epic 1: Search GitHub User

### Feature: Search by Username

**User Story**

> As a user, I want to search for a GitHub username so that I can view their public profile.

### Acceptance Criteria

* User sees an input field.
* User enters a username.
* User clicks Search (or presses Enter).
* Frontend calls your Next.js API route.
* Backend fetches data from GitHub.
* Profile information is displayed.

---

## Epic 2: View Profile Information

### Feature: User Profile Card

**User Story**

> As a user, I want to see key profile information about a GitHub user.

### Acceptance Criteria

Display:

* Avatar
* Username
* Name
* Bio
* Followers count
* Following count
* Public repository count

States:

* Loading state while fetching
* Error state if user not found
* Error state if API fails

---

## Epic 3: View Repositories

### Feature: Repository List

**User Story**

> As a user, I want to browse a user's repositories.

### Acceptance Criteria

For each repository show:

* Repository name
* Description
* Primary language
* Star count
* Last updated date

Repositories are displayed after profile data loads.

---

## Epic 4: Sort Repositories

### Feature: Sorting

**User Story**

> As a user, I want to sort repositories so I can find important projects quickly.

### Acceptance Criteria

Sorting options:

* Stars (descending)
* Name (ascending)
* Last Updated (descending)

Changing sort updates list immediately.

No additional API requests required.

---

## Epic 5: Error Handling

### Feature: User Not Found

**User Story**

> As a user, I want clear feedback when a username doesn't exist.

### Acceptance Criteria

If GitHub returns 404:

* Show:

  * "User not found"
* Hide previous results

---

### Feature: Rate Limit Handling

**User Story**

> As a user, I want meaningful feedback when GitHub is unavailable.

### Acceptance Criteria

If GitHub rate limit is exceeded:

* Show friendly message
* Explain retry later

Example:

> GitHub rate limit exceeded. Please try again in a few minutes.

---

### Feature: Network Errors

### Acceptance Criteria

If backend cannot reach GitHub:

* Show generic error message
* Allow retry

---

# Should Have Features

## Epic 6: Backend Caching

### Feature: In-Memory Cache

**User Story**

> As a developer, I want to cache responses to reduce GitHub API usage.

### Acceptance Criteria

* Cache profile response by username.
* Cache repository response by username.
* Cache duration = 60 seconds.
* Repeat requests within 60 seconds use cache.
* No GitHub API call made during cache hit.

### Suggested Implementation

```ts
const cache = new Map();

cache.set(username, {
  data,
  expiresAt: Date.now() + 60_000,
});
```

---

## Epic 7: Loading States

### Feature: Skeleton UI

**User Story**

> As a user, I want visual feedback while data loads.

### Acceptance Criteria

* Profile skeleton displayed.
* Repository skeleton displayed.
* Skeleton disappears when data arrives.

---

## Epic 8: Repository Pagination

### Feature: Load More

**User Story**

> As a user, I want to browse large repository collections.

### Acceptance Criteria

* Initial load = 30 repos.
* User clicks Load More.
* Next page is fetched.
* New repositories append to existing list.

### Backend API Example

```http
GET /api/github/octocat?page=2
```

---

## Epic 9: Expand Repository Details

### Feature: Repository Details Panel

**User Story**

> As a user, I want more information about a repository.

### Acceptance Criteria

When clicking a repository:

Display:

* Open issues count
* Default branch
* Repository URL
* Fork count

Toggle open/close.

---

# Bonus Features

## Epic 10: Recent Searches

### Feature: Search History

**User Story**

> As a user, I want quick access to previous searches.

### Acceptance Criteria

* Last 5 searches saved.
* Stored in localStorage.
* Clicking a previous search runs search again.

---

## Epic 11: Language Analytics

### Feature: Repository Language Chart

**User Story**

> As a user, I want to understand which languages are used most.

### Acceptance Criteria

* Aggregate repository languages.
* Display pie chart or bar chart.
* Update when profile changes.

Libraries:

* Recharts
* Chart.js

---

## Epic 12: Debounced Search

### Feature: Search as You Type

**User Story**

> As a user, I want automatic searching without repeatedly clicking Search.

### Acceptance Criteria

* Search starts after 500ms idle time.
* Duplicate requests prevented.
* Loading state shown.

---

# Suggested API Design

### Get User Profile

```http
GET /api/github/users/:username
```

Response:

```json
{
  "profile": {},
  "repos": []
}
```

---

### Load More Repositories

```http
GET /api/github/users/:username/repos?page=2
```

Response:

```json
{
  "repos": [],
  "hasMore": true
}
```

---

# Development Order

### Phase 1 (Core MVP)

* Search input
* Backend proxy route
* Profile card
* Repository list
* Sorting
* Error handling

### Phase 2

* Loading states
* Caching
* Pagination

### Phase 3

* Expand repo details
* Recent searches
* Language chart
* Debounced search

This gives you a clean implementation path and maps directly to the assignment's "Must Have → Should Have → Nice to Have" requirements.
