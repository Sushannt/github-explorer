import { UserSearchCard } from "@/components/search/user-search.card";
import { PaginationControls } from "@/components/search/pagination.controls";
import { getSearchResults } from "@/lib/fetchers";

type Props = {
  params: Promise<{ query: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { query } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? "1"));

  const decodedQuery = decodeURIComponent(query);
  const [data, error] = await getSearchResults(decodedQuery, page);

  if (error) {
    return (
      <p className="text-center text-sm text-destructive">{error.message}</p>
    );
  }

  if (!data || data.users.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No users found for &ldquo;{decodedQuery}&rdquo;.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted-foreground">
        {data.totalCount.toLocaleString()} results for &ldquo;{decodedQuery}
        &rdquo;
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.users.map((user) => (
          <UserSearchCard key={user.username} user={user} searchQuery={decodedQuery} />
        ))}
      </div>

      <PaginationControls
        query={decodedQuery}
        page={page}
        totalCount={data.totalCount}
      />
    </div>
  );
}
