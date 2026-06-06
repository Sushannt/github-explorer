import Link from "next/link";

export type RepoSort = "updated" | "stars" | "name";

const OPTIONS: { value: RepoSort; label: string }[] = [
  { value: "updated", label: "Updated" },
  { value: "stars", label: "Stars" },
  { value: "name", label: "Name" },
];

interface Props {
  username: string;
  current: RepoSort;
  trail?: string;
}

export function RepoSortControls({ username, current, trail }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">Sort:</span>
      {OPTIONS.map(({ value, label }) => {
        const entries = Object.entries({ sort: value, trail })
          .filter((e): e is [string, string] => e[1] !== undefined);
        const params = new URLSearchParams(entries);
        return (
        <Link
          key={value}
          href={`/profile/${username}?${params}`}
          className={`rounded-sm border px-2 py-0.5 text-xs transition-colors ${
            current === value
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          }`}
        >
          {label}
        </Link>
        );
      })}
    </div>
  );
}
