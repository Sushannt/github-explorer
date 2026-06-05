export interface IGitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

export interface IUserProfile {
  username: string;
  name: string | null;
  avatar: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  publicRepos: number;
}

export interface IGitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  updated_at: string;
}

export interface IRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  fork: boolean;
  updatedAt: string;
}

export interface IProfileResponse {
  profile: IUserProfile;
  repos: IRepo[];
  totalRepos: number;
}

export interface IGitHubSearchItem {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface IGitHubSearchResponse {
  total_count: number;
  items: IGitHubSearchItem[];
}

export interface IUserSearchResult {
  username: string;
  avatar: string;
  profileUrl: string;
  bio: string | null;
  location: string | null;
  followers: number;
  publicRepos: number;
}

export interface ISearchResponse {
  users: IUserSearchResult[];
  totalCount: number;
  page: number;
}
