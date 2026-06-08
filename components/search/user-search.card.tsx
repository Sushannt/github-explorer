import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IUserSearchResult } from "@/types/search.type";
import { encodeTrail } from "@/lib/trail";

interface Props {
  user: IUserSearchResult;
  searchQuery: string;
}

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function avatarRing(followers: number): string {
  if (followers >= 10_000) return "ring-2 ring-primary";
  if (followers >= 1_000) return "ring-2 ring-foreground/25";
  return "ring-1 ring-foreground/10";
}

export function UserSearchCard({ user, searchQuery }: Props) {
  const isPopular = user.followers >= 10_000;
  const trail = encodeTrail([{ label: searchQuery, href: `/search/${encodeURIComponent(searchQuery)}` }]);

  return (
    <Link
      href={`/profile/${user.username}?trail=${trail}`}
      className="group block"
      prefetch={false}
    >
      <Card className="cursor-pointer gap-0 overflow-hidden py-0 transition-all group-hover:ring-foreground/20">
        {/* Avatar band */}
        <div className="flex justify-center bg-muted/60 py-6">
          <Image
            src={user.avatar}
            alt={user.username}
            width={80}
            height={80}
            loading="eager"
            className={`rounded-full ${avatarRing(user.followers)}`}
          />
        </div>

        {/* Identity */}
        <div className="px-4 pb-2 pt-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold leading-tight text-foreground">
              {user.username}
            </p>
            {isPopular && (
              <Badge variant="secondary" className="shrink-0 text-[10px]">
                Popular
              </Badge>
            )}
          </div>

          {user.location && (
            <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" />
              {user.location}
            </p>
          )}
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="border-t px-4 py-2.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {user.bio}
          </p>
        )}

        {/* Stats */}
        <div className="border-t px-4 py-3 text-xs">
          <span className="font-semibold text-foreground">
            {compact(user.followers)}
          </span>
          <span className="text-muted-foreground"> followers</span>
          <span className="mx-1.5 text-muted-foreground">·</span>
          <span className="font-semibold text-foreground">
            {compact(user.publicRepos)}
          </span>
          <span className="text-muted-foreground"> repos</span>
        </div>
      </Card>
    </Link>
  );
}
