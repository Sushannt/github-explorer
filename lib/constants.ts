// Base URL for all GitHub REST API requests
export const GITHUB_API_BASE_URL = "https://api.github.com";

// Number of user cards shown per page on the search results page (/search/[query])
// Also used as the default perPage value in PaginationControls
export const SEARCH_PER_PAGE = 9;

// Number of repos fetched per page on the profile page (/profile/[username])
// Matches the per_page param sent to GET /users/{username}/repos
export const REPOS_PER_PAGE = 9;
