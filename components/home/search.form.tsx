import { redirect } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

type SearchFormProps = {
  value?: string;
};

async function searchAction(formData: FormData) {
  "use server";
  const username = formData.get("username")?.toString().trim();
  if (!username) return;
  redirect(`/search/${encodeURIComponent(username)}`);
}

const SearchForm = ({ value }: SearchFormProps) => {
  return (
    <form
      key={value}
      className="mx-auto flex max-w-xl gap-2"
      action={searchAction}
    >
      <Input
        name="username"
        placeholder="Enter GitHub username..."
        className="h-12 rounded-sm"
        defaultValue={value}
      />

      <Button size="lg" type="submit" className="h-12 rounded-sm">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
