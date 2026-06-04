"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

type SearchFormProps = {
  value?: string;
};

const SearchForm = ({ value }: SearchFormProps) => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString().trim();
    if (!username) return;
    router.push(`/search/${encodeURIComponent(username)}`);
  };

  return (
    <form
      key={value}
      className="mx-auto flex max-w-xl gap-2"
      onSubmit={handleSubmit}
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
