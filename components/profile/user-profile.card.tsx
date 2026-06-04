import Image from "next/image";
import { Users, UserPlus, BookOpen } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { IUserProfile } from "@/types/User.type";

interface Props {
  profile: IUserProfile;
}

export function UserProfileCard({ profile }: Props) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Image
          src={profile.avatar}
          alt={profile.username}
          width={96}
          height={96}
          className="rounded-full"
        />

        <div>
          <h2 className="text-2xl font-semibold">
            {profile.name ?? profile.username}
          </h2>

          <p className="text-muted-foreground">@{profile.username}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm">{profile.bio ?? "No bio available."}</p>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-4">
              <Users className="size-5" />
              <span className="text-2xl font-bold">{profile.followers}</span>
              <span className="text-xs text-muted-foreground">Followers</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-4">
              <UserPlus className="size-5" />
              <span className="text-2xl font-bold">{profile.following}</span>
              <span className="text-xs text-muted-foreground">Following</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-4">
              <BookOpen className="size-5" />
              <span className="text-2xl font-bold">{profile.publicRepos}</span>
              <span className="text-xs text-muted-foreground">
                Repositories
              </span>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
