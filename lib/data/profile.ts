import { getUser } from "@/app/api/github/get-user";
import { getUserRepos } from "@/app/api/github/get-user-repos";
import { IProfileResponse, IUserProfile } from "@/types/user.type";
import { IRepo } from "@/types/repo.type";
import type { RepoSort } from "@/components/profile/repo-sort.controls";

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

export async function fetchProfile(
  username: string,
  page: number,
  sort: RepoSort,
): Promise<IProfileResponse> {
  const githubSort = sort === "name" ? "full_name" : "updated";

  const [user, rawRepos] = await Promise.all([
    getUser(username),
    getUserRepos(username, page, githubSort),
  ]);

  let repos = rawRepos.map(mapRepo);
  if (sort === "stars") {
    repos = repos.sort((a, b) => b.stars - a.stars);
  }

  return {
    profile: mapProfile(user),
    repos,
    totalRepos: user.public_repos,
  };
}
