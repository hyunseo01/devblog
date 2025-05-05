import Header from "@/components/header/Header";

export default function BoardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section className="h-screen">
        <div className="mt-30 mb-30">{children}</div>
      </section>
    </>
  );
}
