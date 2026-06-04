import { NextRequest } from "next/server";
import { API_BASE_URL, JSONResponse } from "@/lib/api.utls";
import {
  IGitHubSearchItem,
  IGitHubSearchResponse,
  IGitHubUser,
  ISearchResponse,
  IUserSearchResult,
} from "@/types/user.type";

const PER_PAGE = 9;

function fallbackResult(item: IGitHubSearchItem): IUserSearchResult {
  return {
    username: item.login,
    avatar: item.avatar_url,
    profileUrl: item.html_url,
    bio: null,
    location: null,
    followers: 0,
    publicRepos: 0,
  };
}

async function fetchUserDetail(
  item: IGitHubSearchItem,
): Promise<IUserSearchResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${item.login}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackResult(item);
    const user: IGitHubUser = await res.json();
    return {
      username: user.login,
      avatar: user.avatar_url,
      profileUrl: `https://github.com/${user.login}`,
      bio: user.bio,
      location: user.location,
      followers: user.followers,
      publicRepos: user.public_repos,
    };
  } catch {
    return fallbackResult(item);
  }
}

async function searchGitHubUsers(
  query: string,
  page: number,
): Promise<ISearchResponse> {
  const url = `${API_BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}`;

  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to fetch users from GitHub");
  }

  const data: IGitHubSearchResponse = await response.json();

  const users = await Promise.all(data.items.map(fetchUserDetail));

  return { users, totalCount: data.total_count, page };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

    if (!query || query.trim() === "") {
      return JSONResponse({ error: "Query parameter is required" }, 400);
    }

    const result = await searchGitHubUsers(query.trim(), page);
    return JSONResponse(result, 200);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    console.error("Search API error:", error);
    return JSONResponse({ error: message }, 500);
  }
}
