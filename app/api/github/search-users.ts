import { GITHUB_API_BASE_URL, SEARCH_PER_PAGE } from "@/lib/constants";
import { githubHeaders } from "@/lib/github-headers";
import { IGitHubSearchResponse } from "@/types/user.type";

export async function searchUsers(
  query: string,
  page: number,
): Promise<IGitHubSearchResponse> {
  const res = await fetch(
    `${GITHUB_API_BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=${SEARCH_PER_PAGE}&page=${page}`,
    { headers: githubHeaders(), next: { revalidate: 60 } },
  );

  if (!res.ok) {
    if (res.status === 403)
      throw new Error("GitHub rate limit exceeded. Please try again later.");
    throw new Error("Failed to fetch users from GitHub");
  }

  return res.json();
}
