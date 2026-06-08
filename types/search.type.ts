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
