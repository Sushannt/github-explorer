import Link from "next/link";
import { Button } from "../ui/button";

const QuickSearchComponent = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {["torvalds", "gaearon", "vercel", "sindresorhus"].map((username) => (
        <Link href={`/search/${username}`} key={username} prefetch={false}>
          <Button variant="outline" size="sm">
            {username}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default QuickSearchComponent;
