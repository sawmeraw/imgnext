"use client";
import { useSearchStore } from "@/store/store";
import { brandOptions } from "@/types/SearchTypes";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import UpdateHokaVersion from "./UpdateHokaVersion";

const SearchForm = ()=>{
    const {brand, setBrand, setProductCode, setImageUrls, setLoading} = useSearchStore();

    const handleBrandChange = (event, brand: string)=>{
        setBrand(brand);
    }

    const handleFormSubmit = async (event: FormEvent)=>{
        setLoading(true);
        event.preventDefault();
        
        if(brand != null){
            const form = event.target as HTMLFormElement;
            const productCode = form.productCode.value as string;
            if(brand && productCode){
                try{
                    const query = new URLSearchParams({brand, productCode}).toString()
                    const resp = await fetch(`/search?${query}`)
                    if (!resp.ok){
                        console.log(resp.status)
                        const errorData = resp.json()
                        toast.error(errorData.error || "An error occurred.")
                        setLoading(false);
                        return;
                    }
                    const imageUrls = await resp.json()
                    if(imageUrls.images.length > 0){
                        setImageUrls(imageUrls.images)
                    } else{
                        toast.error("No images found.")
                    }
                } catch(error){
                    toast.error("An error occurred while fetching images.")
                } finally{
                    setLoading(false);
                }
                setProductCode(productCode);
            }
        }

        setLoading(false);
        
    }

    const displayBrandName = (value : string)=>{
        const matchedOption = brandOptions.filter(option => option.brandValue == value)
        if (matchedOption.length > 0) {
            return matchedOption[0].brandName;
        } else {
            return "Select a brand";
        }
    }

    return(
        <div className="w-1/3 bg-white px-2 py-2 rounded overflow-hidden flex flex-row gap-4">
            <div className= "flex flex-col w-1/6 justify-start gap-4 bg-black rounded-md p-1">
            {brandOptions.map((btn, index)=> {
                return <div key={index} className="basis-16">
                <button onClick={ (event)=> handleBrandChange(event, btn.brandValue)} className={`h-full w-full rounded-md ${brand == btn.brandValue ? "bg-white" : "bg-black"} ${brand == btn.brandValue ? "text-black" : "text-white"}`}>{btn.brandName}</button>
            </div>
            }) }
                
            </div>
            <div>
                <h2 className="font-semibold text-2xl mt-4">{displayBrandName(brand)} </h2>
                <form onSubmit={handleFormSubmit} method="get" className="my-8">
                    
                    <div className="mt-4">
                        <input name="productCode" required className="py-2 px-4 bg-neutral-300 rounded-sm placeholder:text-slate-600" type="text" placeholder="Product Code" />
                    </div>
                    
                    <div className="mt-4">
                        <button className="py-2 px-4 bg-black rounded text-white text-md font-semibold cursor-pointer hover:bg-stone-600 duration-200 " type="submit">Fetch</button>
                    </div>
                    {brand === "hoka" ? <UpdateHokaVersion/> : null}
                </form>
            </div>
            

        </div>
    )
}

export default SearchForm;
