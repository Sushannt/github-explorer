import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

function RepoCardSkeleton() {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden py-0">
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="flex items-center justify-between border-t px-4 py-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-10" />
      </div>
    </Card>
  );
}

export default function ProfileLoading() {
  return (
    <div className="space-y-8">
      {/* Profile card skeleton */}
      <Card className="w-full gap-0 overflow-hidden py-0">
        <div className="flex flex-col items-center gap-4 bg-muted/40 p-6 sm:flex-row sm:items-start">
          <Skeleton className="size-24 shrink-0 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="mx-auto h-5 w-36 sm:mx-0" />
            <Skeleton className="mx-auto h-4 w-24 sm:mx-0" />
            <Skeleton className="mx-auto h-3 w-28 sm:mx-0" />
            <Skeleton className="mx-auto h-8 w-full sm:mx-0" />
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x border-t">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1 py-4">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>
      </Card>

      {/* Repos skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <RepoCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
