import { NextRequest } from "next/server";
import { JSONResponse } from "@/lib/api.utls";
import { fetchSearchResults } from "@/lib/data/search";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    const page = Math.max(1, Number(request.nextUrl.searchParams.get("page") ?? "1"));

    if (!query || query.trim() === "") {
      return JSONResponse({ error: "Query parameter is required" }, 400);
    }

    const data = await fetchSearchResults(query.trim(), page);
    return JSONResponse(data, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    console.error("Search API error:", error);
    return JSONResponse({ error: message }, 500);
  }
}
