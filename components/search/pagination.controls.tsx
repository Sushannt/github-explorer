import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PER_PAGE = 9;

interface Props {
  query: string;
  page: number;
  totalCount: number;
}

export function PaginationControls({ query, page, totalCount }: Props) {
  const totalPages = Math.max(1, Math.ceil(Math.min(totalCount, 1000) / PER_PAGE));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <Button variant="outline" size="sm" disabled={!hasPrev} asChild={hasPrev}>
        {hasPrev ? (
          <Link href={`/search/${encodeURIComponent(query)}?page=${page - 1}`} prefetch={false}>
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
          <Link href={`/search/${encodeURIComponent(query)}?page=${page + 1}`} prefetch={false}>
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
