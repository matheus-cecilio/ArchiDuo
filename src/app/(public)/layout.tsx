import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar siteName="ArchiDuo" />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer 
        siteName="ArchiDuo"
        email="contato@archiduo.com"
        instagram="archiduo"
      />
    </>
  );
}
