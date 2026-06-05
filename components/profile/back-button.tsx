"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 px-2"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
}
