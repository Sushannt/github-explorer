import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SEARCH_PER_PAGE as PER_PAGE } from "@/lib/constants";

interface Props {
  query?: string;
  basePath?: string;
  page: number;
  totalCount: number;
  perPage?: number;
  extraParams?: Record<string, string>;
}

export function PaginationControls({ query, basePath, page, totalCount, perPage = PER_PAGE, extraParams }: Props) {
  const resolvedBase = basePath ?? `/search/${encodeURIComponent(query ?? "")}`;

  const buildHref = (p: number) => {
    const entries = Object.entries({ ...extraParams, page: String(p) })
      .filter((entry): entry is [string, string] => entry[1] !== undefined);
    const params = new URLSearchParams(entries);
    return `${resolvedBase}?${params}`;
  };

  const totalPages = Math.max(
    1,
    Math.ceil(Math.min(totalCount, 1000) / perPage),
  );
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <Button variant="outline" size="sm" disabled={!hasPrev} asChild={hasPrev}>
        {hasPrev ? (
          <Link href={buildHref(page - 1)}>
            <ChevronLeft className="size-4" />
            Previous
          </Link>
        ) : (
          <span className="flex items-center gap-1">
            <ChevronLeft className="size-4" />
            Previous
          </span>
        )}
      </Button>

      <span className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button variant="outline" size="sm" disabled={!hasNext} asChild={hasNext}>
        {hasNext ? (
          <Link href={buildHref(page + 1)}>
            Next
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span className="flex items-center gap-1">
            Next
            <ChevronRight className="size-4" />
          </span>
        )}
      </Button>
    </div>
  );
}
