import { NextRequest } from "next/server";
import { JSONResponse } from "@/lib/api.utls";
import { ISearchResponse, IUserSearchResult } from "@/types/user.type";
import { getUser } from "../github/get-user";
import { searchUsers } from "../github/search-users";

async function enrichSearchItem(
  item: Awaited<ReturnType<typeof searchUsers>>["items"][number],
): Promise<IUserSearchResult> {
  try {
    const user = await getUser(item.login);
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
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

    if (!query || query.trim() === "") {
      return JSONResponse({ error: "Query parameter is required" }, 400);
    }

    const data = await searchUsers(query.trim(), page);
    const users = await Promise.all(data.items.map(enrichSearchItem));

    const result: ISearchResponse = {
      users,
      totalCount: data.total_count,
      page,
    };

    return JSONResponse(result, 200);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    console.error("Search API error:", error);
    return JSONResponse({ error: message }, 500);
  }
}
