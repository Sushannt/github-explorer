"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Input } from "../ui/input";

interface Props {
  defaultValue?: string;
  clearHref?: string;
}

export function SearchInput({ defaultValue, clearHref }: Props) {
  const [value, setValue] = useState(defaultValue ?? "");
  const router = useRouter();

  function handleClear() {
    setValue("");
    if (clearHref) router.push(clearHref);
  }

  return (
    <div className="relative flex-1">
      <Input
        name="username"
        placeholder="Enter GitHub username..."
        className="h-12 rounded-sm pr-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
