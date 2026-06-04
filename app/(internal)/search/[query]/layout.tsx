import SearchForm from "@/components/home/search.form";

type Props = {
  children: React.ReactNode;
  params: Promise<{ query: string }>;
};

export default async function SearchLayout({ children, params }: Props) {
  const { query } = await params;

  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-40 -mx-4 border-b bg-background px-4 py-4">
        <SearchForm value={decodeURIComponent(query)} />
      </div>
      {children}
    </div>
  );
}
