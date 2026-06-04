import { UserProfileCard } from "@/components/profile/user-profile.card";
import { UserProfileError } from "@/components/profile/user-profile.error";
import { RepoCard } from "@/components/profile/repo.card";
import { unwrap } from "@/lib/api.utls";
import { IProfileResponse } from "@/types/user.type";

type Props = {
  params: Promise<{ username: string }>;
};

const getProfile = (username: string) =>
  unwrap<IProfileResponse>(
    fetch(
      `http://localhost:3000/api/profile?username=${encodeURIComponent(username)}`,
    ).then((res) => res.json()),
  );

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const [data, error] = await getProfile(username);

  if (error) {
    return <UserProfileError message={error.message} />;
  }

  if (!data) {
    return <UserProfileError message="Could not load profile." />;
  }

  const { profile, repos } = data;

  return (
    <div className="space-y-8">
      <UserProfileCard profile={profile} />

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            Repositories
          </h2>
          <span className="text-xs text-muted-foreground">
            ({repos.length})
          </span>
        </div>

        {repos.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No public repositories.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
