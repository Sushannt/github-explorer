"use client";

import { useState } from "react";
import { ExternalLink, Star, Clock, ChevronDown, GitBranch, CircleDot } from "lucide-react";
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
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="flex flex-col gap-0 overflow-hidden py-0">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex flex-1 flex-col gap-2 p-4 text-left"
        aria-expanded={expanded}
      >
        {/* Name row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            <span className="truncate text-sm font-semibold text-foreground">
              {repo.name}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {repo.fork && (
              <Badge variant="outline" className="text-[10px]">
                Fork
              </Badge>
            )}
            <ChevronDown
              className={`size-3.5 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Description */}
        {repo.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {repo.description}
          </p>
        )}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t bg-muted/40 px-4 py-3">
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CircleDot className="size-3.5 shrink-0" />
              <span>
                <span className="font-medium text-foreground">{repo.openIssues}</span> open issue{repo.openIssues !== 1 ? "s" : ""}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <GitBranch className="size-3.5 shrink-0" />
              <span>Default branch: <span className="font-medium text-foreground">{repo.defaultBranch}</span></span>
            </span>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-0.5 flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="size-3" />
              View on GitHub
            </a>
          </div>
        </div>
      )}

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
