import PageWrapper from "@/components/PageWrapper";
import RunDNADetails from "@/components/RunDNADetails";
import RunDNAPreview from "@/components/RunDNAPreview";
import RunDNASearch from "@/components/RunDNASearch";

export default function RunDnaPage() {
  return (
    <>
      <PageWrapper>
        <div className="w-full rounded-md overflow-hidden min-h-[1000px]">
          <div className="py-4">
            <h2 className="font-semibold text-center text-2xl">
              RunDNA Integration
            </h2>
          </div>
          <div className="flex mt-4 gap-4">
            <RunDNASearch />
            <RunDNAPreview />
          </div>
          <div>
            <RunDNADetails />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
