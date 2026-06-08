import { NextRequest } from "next/server";
import { JSONResponse } from "@/lib/api.utls";
import { fetchProfile } from "@/lib/data/profile";
import type { RepoSort } from "@/components/profile/repo-sort.controls";

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username");

    if (!username || username.trim() === "") {
      return JSONResponse({ error: "Username parameter is required" }, 400);
    }

    const page = Math.max(1, Number(request.nextUrl.searchParams.get("page") ?? "1"));
    const sort = (request.nextUrl.searchParams.get("sort") ?? "updated") as RepoSort;

    const data = await fetchProfile(username.trim(), page, sort);
    return JSONResponse(data, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    if (message === "User not found") return JSONResponse({ error: message }, 404);
    console.error("Profile API error:", error);
    return JSONResponse({ error: message }, 500);
  }
}
