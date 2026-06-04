import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SearchForm from "@/components/home/search.form";
import QuickSeachComponent from "@/components/home/quick-search.component";

export default async function Home() {
  return (
    <section className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-3xl border-border/50">
        <CardContent className="space-y-8 p-8 md:p-12">
          <div className="space-y-4 text-center">
            <Badge variant="secondary">GitHub Profile Explorer</Badge>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Discover GitHub Developers
            </h1>

            <p className="mx-auto max-w-xl text-muted-foreground">
              Search any GitHub username and instantly view profile details,
              repositories, followers, and contribution insights.
            </p>
          </div>

          <SearchForm />
          <QuickSeachComponent />
        </CardContent>
      </Card>
    </section>
  );
}
