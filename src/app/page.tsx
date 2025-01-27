import Note from "@/components/Note";
import PageWrapper from "@/components/PageWrapper";
import Preview from "@/components/Preview";
import SearchForm from "@/components/SearchForm";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex gap-4">
        <SearchForm />
        <Preview />
      </div>
     <div>
        <Note />
      </div>
    </PageWrapper>
  );
}
