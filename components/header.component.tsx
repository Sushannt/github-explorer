import Link from "next/link";
import { LucideGitGraph } from "lucide-react";

export function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <LucideGitGraph className="size-6" />
          <span className="font-semibold">GitHub Profile Explorer</span>
        </Link>
      </div>
    </header>
  );
}
