"use client";

import { useSearchStore } from "@/store/store";
import { brandButtons } from "@/types/SearchTypes";
import FetchImages from "@/utils/FetchImages";
import { FormEvent } from "react";
import { toast } from "react-toastify";

const SearchForm = ()=>{
    const {brand, setBrand, setProductCode, setColorCode, setImageUrls} = useSearchStore();
    

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        setBrand(event.target.value);
    }

    const checkSelectedBrand = (brand: string) : boolean=>{
        let match = false;
        brandButtons.map(btn=>{
            if(btn.brandValue === brand){
                match = true;
            }
        })
        if(!match){
            toast.error("Please select a brand from the list.", {
                autoClose: 2000
            })
        }
        
        return match;
    }

    const handleFormSubmit = async (event: FormEvent)=>{
        event.preventDefault();

        if(checkSelectedBrand(brand)){
            const form = event.target as HTMLFormElement;
            const brand = form.brand.value as string;
            const productCode = form.productCode.value as string;
            const colorCode = form.colorCode.value as string;
            if(brand && productCode && colorCode){
                const imageArray = FetchImages({brand, productCode, colorCode});
                setImageUrls(imageArray);
                setProductCode(productCode);
                setColorCode(colorCode);
            }
        }
        
    }
    
    return(
        <div className="w-1/3 bg-white px-4 py-2 rounded-md overflow-hidden">
            <h2 className="font-semibold text-2xl mt-4">Search </h2>
            <form onSubmit={handleFormSubmit} className="my-8">
                <div className="mt-4">
                    <select onChange={handleSelectChange} className="py-2 px-4 bg-neutral-300 rounded-sm w-1/2" name="brand" id="brand">
                        <option value="">Select a Brand</option>
                        {brandButtons.map((btn, index)=>{
                            return <option key={index} value={btn.brandValue} >{btn.brandName}</option>
                        })}
                    </select>
                </div>
                <div className="mt-4">
                    <input name="productCode" required className="py-2 px-4 bg-neutral-300 rounded-sm placeholder:text-slate-600" type="text" placeholder="Product Code" />
                </div>
                <div className="mt-4">
                    <input required name="colorCode" className="py-2 px-4 bg-neutral-300 rounded-sm placeholder:text-slate-600" type="text" placeholder="Color Code"/>
                </div>
                <div className="mt-4">
                    <button className="py-2 px-4 bg-emerald-400 rounded-md text-white text-md font-semibold cursor-pointer hover:bg-emerald-500 duration-200 " type="submit" title="fetch images">Fetch</button>
                </div>
            </form>

        </div>
    )
}

export default SearchForm;