import UpdateHokaVersion from "@/components/UpdateHokaVersion"

export default function ConfigPage(){
    return(
        <>
            <main className="bg-white rounded px-4 py-2 text-black w-full min-h-[400px]">
                <h2 className="font-semibold text-2xl mt-4">Configuration</h2>
                <section className="flex mt-4">
                    <div className="w-1/3 px-2 py-4 bg-white rounded overflow-hidden flex flex-col shadow-md">
                        <UpdateHokaVersion/>
                    </div>
                    
                </section>
            </main>
        </>
    )
}