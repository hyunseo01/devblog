import Header from "@/components/header/Header";
import Contact from "@/components/portfolio/Contact";

export default function BoardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section>
        <div className="mt-30 mb-30">{children}</div>
      </section>
      <Contact />
    </>
  );
}
