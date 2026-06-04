import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function UserProfileSkeleton() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row gap-4">
        <Skeleton className="size-24 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Skeleton className="h-16 w-full" />

        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </CardContent>
    </Card>
  );
}
