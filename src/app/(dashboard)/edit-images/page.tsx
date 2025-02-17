
import ImageUploadForm from "@/components/ImageUploadForm"
export default function EditImagesPage() {
    return (
        <>
            <main className="bg-white rounded px-4 py-2 text-black w-full min-h-[700px]">
                <h2 className="font-semibold text-2xl mt-4">Crop and Resize Image </h2>
                <p className="text-sm font-semibold ">This will crop whitespace and maintain 1:1 aspect ratio.</p>
                <section className="w-full mt-4">

                    <ImageUploadForm />

                </section>
            </main>
        </>
    )
}