import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { SearchInput } from "./search-input";

type SearchFormProps = {
  value?: string;
  clearHref?: string;
};

async function searchAction(formData: FormData) {
  "use server";
  const username = formData.get("username")?.toString().trim();
  if (!username) return;
  redirect(`/search/${encodeURIComponent(username)}`);
}

const SearchForm = ({ value, clearHref }: SearchFormProps) => {
  return (
    <form className="mx-auto flex max-w-xl gap-2" action={searchAction}>
      <SearchInput key={value} defaultValue={value} clearHref={clearHref} />

      <Button size="lg" type="submit" className="h-12 rounded-sm">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
