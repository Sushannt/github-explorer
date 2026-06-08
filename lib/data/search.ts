import { getUser } from "@/app/api/github/get-user";
import { searchUsers } from "@/app/api/github/search-users";
import { ISearchResponse, IUserSearchResult } from "@/types/search.type";

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

export async function fetchSearchResults(
  query: string,
  page: number,
): Promise<ISearchResponse> {
  const data = await searchUsers(query, page);
  const users = await Promise.all(data.items.map(enrichSearchItem));

  return {
    users,
    totalCount: data.total_count,
    page,
  };
}
