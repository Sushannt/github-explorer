export interface IGitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  updated_at: string;
  open_issues_count: number;
  default_branch: string;
}

export interface IRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  fork: boolean;
  updatedAt: string;
  openIssues: number;
  defaultBranch: string;
}
