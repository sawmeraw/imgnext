import BrandHeader from "@/components/BrandHeader";
import Note from "@/components/Note";
import PageWrapper from "@/components/PageWrapper";
import Preview from "@/components/Preview";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <PageWrapper>
      <BrandHeader/>
        <div className="flex gap-4">
          <SearchForm/> 
          <Preview/>
        </div>
        <div>
          <Note/>
        </div>
    </PageWrapper>
  );
}
