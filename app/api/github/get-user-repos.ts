import { GITHUB_API_BASE_URL, REPOS_PER_PAGE } from "@/lib/constants";
import { githubHeaders } from "@/lib/github-headers";
import { IGitHubRepo } from "@/types/user.type";

export async function getUserRepos(
  username: string,
  page: number,
  sort: "updated" | "full_name" = "updated",
): Promise<IGitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API_BASE_URL}/users/${username}/repos?sort=${sort}&per_page=${REPOS_PER_PAGE}&page=${page}`,
    { headers: githubHeaders(), next: { revalidate: 60 } },
  );

  if (!res.ok) {
    console.error(
      `Repos fetch failed for ${username}: ${res.status} ${res.statusText}`,
    );
    return [];
  }

  return res.json();
}
