import SearchForm from "@/components/home/search.form";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-40 -mx-4 border-b bg-background px-4 py-4">
        <SearchForm />
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="mb-4 size-10 text-muted-foreground/30" />
          <p className="text-sm font-medium text-muted-foreground">
            Search for a GitHub user to see results
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
