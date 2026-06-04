import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

function UserSearchCardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/* Avatar band */}
      <div className="flex justify-center bg-muted/60 py-6">
        <Skeleton className="size-20 rounded-full" />
      </div>

      {/* Identity */}
      <div className="px-4 pb-2 pt-3 space-y-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>

      {/* Bio */}
      <div className="border-t px-4 py-2.5 space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      {/* Stats */}
      <div className="border-t px-4 py-3">
        <Skeleton className="h-3 w-32" />
      </div>
    </Card>
  );
}

export default function SearchLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-48" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <UserSearchCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
