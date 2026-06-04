import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IUserProfile } from "@/types/user.type";

interface Props {
  profile: IUserProfile;
}

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function UserProfileCard({ profile }: Props) {
  return (
    <Card className="w-full gap-0 overflow-hidden py-0">
      {/* Header band */}
      <div className="flex flex-col items-center gap-4 bg-muted/40 p-6 sm:flex-row sm:items-start">
        <Image
          src={profile.avatar}
          alt={profile.username}
          width={96}
          height={96}
          className="shrink-0 rounded-full ring-2 ring-foreground/10"
          loading="eager"
        />

        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-base font-semibold text-foreground">
            {profile.name ?? profile.username}
          </h1>
          <p className="text-sm text-muted-foreground">@{profile.username}</p>

          {profile.location && (
            <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground sm:justify-start">
              <MapPin className="size-3 shrink-0" />
              {profile.location}
            </p>
          )}

          {profile.bio && (
            <p className="pt-1 text-xs leading-relaxed text-muted-foreground">
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 divide-x border-t text-center">
        <div className="py-4">
          <p className="text-sm font-semibold text-foreground">
            {compact(profile.followers)}
          </p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="py-4">
          <p className="text-sm font-semibold text-foreground">
            {compact(profile.following)}
          </p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
        <div className="py-4">
          <p className="text-sm font-semibold text-foreground">
            {profile.publicRepos}
          </p>
          <p className="text-xs text-muted-foreground">Repos</p>
        </div>
      </div>
    </Card>
  );
}
