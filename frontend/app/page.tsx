import Header from "@/components/layout/Header";
import ImportPage from "@/components/import/ImportPage";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <ImportPage />
      </main>
    </>
  );
}