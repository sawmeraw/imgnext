"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ScrapeRequest, ScrapeResponse } from "@/types/ApiTypes";
import { checkExisting, useRunDNASearchStore } from "@/store/store";

export default function RunDNASearch() {

    const {addSingleProduct, updateCurrentProductCode, setLoading}  = useRunDNASearchStore();
    const [error, setError] = useState<boolean>(false);

    const handleError = ()=>{
      setError(true);
      setTimeout(()=>{
        setError(false);
      }, 5000)
    }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const productCode = form.productCode.value as string;
    if (productCode.split(" ").length > 1){
      toast.error("Keywords are yet to be handled in scraping.", {
        autoClose: 1500
      })
      return
    }
    try {
        const reqObject : ScrapeRequest = {
            productCode
        }
        
        const existing = await checkExisting(productCode);

        if(existing){
            toast.warning("Product already added in the list.", {
                autoClose: 1500
            })
            return;
        }

        setLoading();
        
        const response = await fetch("/api/scrape", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(reqObject)
        })

        const res : ScrapeResponse = await response.json();
        
        const {data} = res;

        addSingleProduct({
            productCode,
            imageUrls: data.filter((value, index, self)=> self.indexOf(value) === index),
            success: res.success,
        });

        setLoading();

        updateCurrentProductCode(productCode);

    } catch (error) {
        toast.error("Not found in Sportitude!", {
            autoClose: 1500
        })
        handleError();
        setLoading();
    }
  };

  return (
    <>
      <div className="w-1/3 bg-white px-4 py-2 rounded-md overflow-hidden">
        <h2 className="font-semibold text-2xl mt-4">Search </h2>
        <form className="mt-8" onSubmit={handleFormSubmit}>
          <div>
            <input
              name="productCode"
              required
              className="py-2 px-4 bg-neutral-300 rounded-sm placeholder:text-slate-600"
              type="text"
              placeholder="Product Code"
            />
            <p className="mt-2 text-xs">
              Search a product in the Sportitude website
            </p>
          </div>
          <div className="mt-4">
            <button
              className="py-2 px-4 bg-emerald-400 rounded-md text-white text-md font-semibold cursor-pointer hover:bg-emerald-500 duration-200 "
              type="submit"
              title="fetch images"
            >
              Scrape
            </button>
          </div>
        </form>

        <div>
          {error && (
            <p className="text-red-500 text-sm mt-2">
              An error occurred, please try again.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
