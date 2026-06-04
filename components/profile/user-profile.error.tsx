import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  message: string;
}

export function UserProfileError({ message }: Props) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="size-4" />

      <AlertTitle>Error</AlertTitle>

      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
