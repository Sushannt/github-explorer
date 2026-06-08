import { unwrap } from "./api.utls";
import { APP_BASE_URL } from "./constants";
import { IProfileResponse } from "@/types/user.type";
import { ISearchResponse } from "@/types/search.type";
import type { RepoSort } from "@/components/profile/repo-sort.controls";

export const getProfile = (username: string, page: number, sort: RepoSort) =>
  unwrap<IProfileResponse>(
    fetch(
      `${APP_BASE_URL}/api/profile?username=${encodeURIComponent(username)}&page=${page}&sort=${sort}`,
    ).then((res) => {
      if (!res.ok) return res.json().then((b) => Promise.reject(new Error(b.error ?? "Failed to load profile")));
      return res.json();
    }),
  );

export const getSearchResults = (query: string, page: number) =>
  unwrap<ISearchResponse>(
    fetch(
      `${APP_BASE_URL}/api/search?query=${encodeURIComponent(query)}&page=${page}`,
    ).then((res) => {
      if (!res.ok) return res.json().then((b) => Promise.reject(new Error(b.error ?? "Search failed")));
      return res.json();
    }),
  );
