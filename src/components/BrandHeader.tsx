import Image from "next/image"

export default function BrandHeader(){
    return (
        <div className="flex flex-col gap-4 py-4 mt-4">
            <h1 className="font-semibold text-2xl text-center">Brands Supported</h1>
            <ul className="bg-slate-500 px-8 py-4 rounded-md flex gap-4 items-center justify-around">
                <li>
                    <Image src="/logo_asics.webp" height={80} width={80} alt="Asics Logo"></Image>
                </li>
                <li>
                    <Image src="/logo_2xu.webp" height={80} width={80} alt="2XU Logo"></Image>
                </li>
                <li>
                    <Image src="/logo_hoka.webp" height={50} width={50} alt="Hoka Logo"></Image>
                </li>
                <li>
                    <Image src="/logo_saucony.webp" height={50} width={50} alt="Saucony Logo"></Image>
                </li>
                <li>
                    <Image src="/logo_newbalance.webp" height={50} width={50} alt="Saucony Logo"></Image>
                </li>
            </ul>
        </div>
    )
}