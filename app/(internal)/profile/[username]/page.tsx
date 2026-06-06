import { UserProfileCard } from "@/components/profile/user-profile.card";
import { UserProfileError } from "@/components/profile/user-profile.error";
import { ProfileBreadcrumb } from "@/components/profile/profile-breadcrumb";
import { RepoCard } from "@/components/profile/repo.card";
import { PaginationControls } from "@/components/search/pagination.controls";
import {
  RepoSortControls,
  type RepoSort,
} from "@/components/profile/repo-sort.controls";
import { REPOS_PER_PAGE } from "@/lib/constants";
import { getProfile } from "@/lib/fetchers";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string; sort?: string; trail?: string }>;
};

export default async function ProfilePage({ params, searchParams }: Props) {
  const { username } = await params;
  const { page: pageParam, sort: sortParam, trail } = await searchParams;

  const page = Math.max(1, Number(pageParam ?? "1"));

  const sort: RepoSort =
    sortParam === "stars" || sortParam === "name" ? sortParam : "updated";

  const [data, error] = await getProfile(username, page, sort);

  if (error) {
    return <UserProfileError message={error.message} />;
  }

  if (!data) {
    return <UserProfileError message="Could not load profile." />;
  }

  const { profile, repos = [], totalRepos } = data;

  return (
    <div className="space-y-8">
      <ProfileBreadcrumb username={username} trail={trail} />
      <UserProfileCard profile={profile} />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-foreground">
              Repositories
            </h2>
            <span className="text-xs text-muted-foreground">
              ({totalRepos})
            </span>
          </div>
          <RepoSortControls username={username} current={sort} trail={trail} />
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
            extraParams={trail ? { sort, trail } : { sort }}
          />
        )}
      </section>
    </div>
  );
}
