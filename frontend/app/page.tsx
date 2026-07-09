import Header from "@/components/layout/Header";
import UploadBox from "@/components/upload/UploadBox";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <UploadBox />
      </main>
    </>
  );
}