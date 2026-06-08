import { ExternalLink, Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLanguageColor } from "@/lib/language-colors";
import { IRepo } from "@/types/repo.type";

interface Props {
  repo: IRepo;
}

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function RepoCard({ repo }: Props) {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden py-0">
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Name row */}
        <div className="flex items-start justify-between gap-2">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 truncate text-sm font-semibold text-foreground hover:text-primary"
          >
            <span className="truncate">{repo.name}</span>
            <ExternalLink className="size-3 shrink-0 text-muted-foreground group-hover:text-primary" />
          </a>

          {repo.fork && (
            <Badge variant="outline" className="shrink-0 text-[10px]">
              Fork
            </Badge>
          )}
        </div>

        {/* Description */}
        {repo.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {repo.description}
          </p>
        )}
      </div>

      {/* Footer: language + stars + updated */}
      <div className="flex items-center justify-between border-t px-4 py-3 text-xs">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            <span className="text-muted-foreground">{repo.language}</span>
          </span>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="size-3" />
            {compact(repo.stars)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {new Date(repo.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </Card>
  );
}
