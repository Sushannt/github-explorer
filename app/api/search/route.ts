import { NextRequest } from "next/server";
import { API_BASE_URL, JSONResponse } from "@/lib/api.utls";
import { IGitHubUser, IUserProfile } from "@/types/User.type";

async function fetchGitHubUser(username: string): Promise<IUserProfile> {
  const response = await fetch(`${API_BASE_URL}/users/${username}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to fetch user data from GitHub");
  }

  const user: IGitHubUser = await response.json();

  return {
    username: user.login,
    name: user.name,
    avatar: user.avatar_url,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query || query.trim() === "") {
      return JSONResponse({ error: "Query parameter is required" }, 400);
    }

    const userProfile = await fetchGitHubUser(query.trim());
    return JSONResponse(userProfile, 200);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";

    if (message === "User not found") {
      return JSONResponse({ error: message }, 404);
    }

    console.error("Search API error:", error);
    return JSONResponse({ error: message }, 500);
  }
}
