import { GITHUB_API_BASE_URL } from "@/lib/constants";
import { githubHeaders } from "@/lib/github-headers";
import { IGitHubUser } from "@/types/user.type";

export async function getUser(username: string): Promise<IGitHubUser> {
  const res = await fetch(`${GITHUB_API_BASE_URL}/users/${username}`, {
    headers: githubHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("User not found");
    if (res.status === 403)
      throw new Error("GitHub rate limit exceeded. Please try again later.");
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
}
