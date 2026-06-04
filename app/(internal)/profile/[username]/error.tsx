"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  error: Error;
  reset: () => void;
}

export default function ProfileError({ error, reset }: Props) {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Failed to load profile</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
      <Button variant="outline" size="sm" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
