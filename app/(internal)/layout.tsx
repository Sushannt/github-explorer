import { HeaderComponent } from "@/components/header.component";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderComponent />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}
