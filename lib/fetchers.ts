import { unwrap } from "./api.utls";
import { IProfileResponse, ISearchResponse } from "@/types/user.type";
import type { RepoSort } from "@/components/profile/repo-sort.controls";

export const getProfile = (username: string, page: number, sort: RepoSort) =>
  unwrap<IProfileResponse>(
    fetch(
      `http://localhost:3000/api/profile?username=${encodeURIComponent(username)}&page=${page}&sort=${sort}`,
    ).then((res) => {
      if (!res.ok) return res.json().then((b) => Promise.reject(new Error(b.error ?? "Failed to load profile")));
      return res.json();
    }),
  );

export const getSearchResults = (query: string, page: number) =>
  unwrap<ISearchResponse>(
    fetch(
      `http://localhost:3000/api/search?query=${encodeURIComponent(query)}&page=${page}`,
    ).then((res) => {
      if (!res.ok) return res.json().then((b) => Promise.reject(new Error(b.error ?? "Search failed")));
      return res.json();
    }),
  );
