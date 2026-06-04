import { NextRequest } from "next/server";
import { API_BASE_URL, JSONResponse } from "@/lib/api.utls";
import {
  IGitHubRepo,
  IGitHubUser,
  IProfileResponse,
  IRepo,
  IUserProfile,
} from "@/types/user.type";

function mapProfile(user: IGitHubUser): IUserProfile {
  return {
    username: user.login,
    name: user.name,
    avatar: user.avatar_url,
    bio: user.bio,
    location: user.location,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
  };
}

function mapRepo(repo: IGitHubRepo): IRepo {
  return {
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    url: repo.html_url,
    fork: repo.fork,
    updatedAt: repo.updated_at,
  };
}

async function fetchProfileData(username: string): Promise<IProfileResponse> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`${API_BASE_URL}/users/${username}`, {
      next: { revalidate: 60 },
    }),
    fetch(`${API_BASE_URL}/users/${username}/repos?sort=updated&per_page=30`, {
      next: { revalidate: 60 },
    }),
  ]);

  if (!userRes.ok) {
    if (userRes.status === 404) throw new Error("User not found");
    if (userRes.status === 403)
      throw new Error("GitHub rate limit exceeded. Please try again later.");
    throw new Error("Failed to fetch user profile");
  }

  const user: IGitHubUser = await userRes.json();
  const rawRepos: IGitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

  return {
    profile: mapProfile(user),
    repos: rawRepos.map(mapRepo),
  };
}

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username");

    if (!username || username.trim() === "") {
      return JSONResponse({ error: "Username parameter is required" }, 400);
    }

    const data = await fetchProfileData(username.trim());
    return JSONResponse(data, 200);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    if (message === "User not found")
      return JSONResponse({ error: message }, 404);
    console.error("Profile API error:", error);
    return JSONResponse({ error: message }, 500);
  }
}
