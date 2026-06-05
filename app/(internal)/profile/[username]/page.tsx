import { UserProfileCard } from "@/components/profile/user-profile.card";
import { UserProfileError } from "@/components/profile/user-profile.error";
import { BackButton } from "@/components/profile/back-button";
import { RepoCard } from "@/components/profile/repo.card";
import { PaginationControls } from "@/components/search/pagination.controls";
import { unwrap } from "@/lib/api.utls";
import { IProfileResponse } from "@/types/user.type";
import { REPOS_PER_PAGE } from "@/lib/constants";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string }>;
};

const getProfile = (username: string, page: number) =>
  unwrap<IProfileResponse>(
    fetch(
      `http://localhost:3000/api/profile?username=${encodeURIComponent(username)}&page=${page}`,
    ).then((res) => res.json()),
  );

export default async function ProfilePage({ params, searchParams }: Props) {
  const { username } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? "1"));
  const [data, error] = await getProfile(username, page);

  if (error) {
    return <UserProfileError message={error.message} />;
  }

  if (!data) {
    return <UserProfileError message="Could not load profile." />;
  }

  const { profile, repos, totalRepos } = data;

  return (
    <div className="space-y-8">
      <BackButton />
      <UserProfileCard profile={profile} />

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            Repositories
          </h2>
          <span className="text-xs text-muted-foreground">({totalRepos})</span>
        </div>

        {repos.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            {totalRepos > 0
              ? "Repositories could not be loaded. GitHub API rate limit may have been reached."
              : "No public repositories."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        )}

        {repos.length && totalRepos > REPOS_PER_PAGE && (
          <PaginationControls
            basePath={`/profile/${username}`}
            page={page}
            totalCount={totalRepos}
            perPage={REPOS_PER_PAGE}
          />
        )}
      </section>
    </div>
  );
}
