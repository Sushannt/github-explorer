import { unwrap } from "./api.utls";
import { fetchProfile } from "./data/profile";
import { fetchSearchResults } from "./data/search";
import type { RepoSort } from "@/components/profile/repo-sort.controls";

export const getProfile = (username: string, page: number, sort: RepoSort) =>
  unwrap(fetchProfile(username, page, sort));

export const getSearchResults = (query: string, page: number) =>
  unwrap(fetchSearchResults(query, page));
