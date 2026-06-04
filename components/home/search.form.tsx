import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

const SearchForm = () => {
  const searchGithub = async (formData: FormData) => {
    "use server";

    const username = formData.get("username")?.toString().trim();

    if (!username) {
      // Handle empty input case, maybe show an error message
      return;
    }

    // Redirect to the search results page for the entered username
    redirect(`/${username}`);
  };

  return (
    <form className="mx-auto flex max-w-xl gap-2" action={searchGithub}>
      <Input
        name="username"
        placeholder="Enter GitHub username..."
        className="h-12 rounded-sm"
      />

      <Button size="lg" type="submit" className="h-12 rounded-sm">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
