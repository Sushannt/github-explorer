// Adds Authorization header when GITHUB_TOKEN is set in the environment.
// Unauthenticated: 60 req/hour. Authenticated: 5000 req/hour.
export function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
