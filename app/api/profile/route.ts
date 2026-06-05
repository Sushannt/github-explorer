import { NextRequest } from "next/server";
import { JSONResponse } from "@/lib/api.utls";
import { IProfileResponse, IRepo, IUserProfile } from "@/types/user.type";
import { getUser } from "../github/get-user";
import { getUserRepos } from "../github/get-user-repos";

function mapProfile(user: Awaited<ReturnType<typeof getUser>>): IUserProfile {
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

function mapRepo(repo: Awaited<ReturnType<typeof getUserRepos>>[number]): IRepo {
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

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username");

    if (!username || username.trim() === "") {
      return JSONResponse({ error: "Username parameter is required" }, 400);
    }

    const page = Math.max(
      1,
      Number(request.nextUrl.searchParams.get("page") ?? "1"),
    );

    const [user, rawRepos] = await Promise.all([
      getUser(username.trim()),
      getUserRepos(username.trim(), page),
    ]);

    const data: IProfileResponse = {
      profile: mapProfile(user),
      repos: rawRepos.map(mapRepo),
      totalRepos: user.public_repos,
    };

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
