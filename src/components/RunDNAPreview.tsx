"use client";

import { useRunDNASearchStore, RunDNASearchType } from "@/store/store";
import Image from "next/image";
import Loading from "./Loading";

export default function RunDNAPreview() {

    const {products, currentProductCode, loading} = useRunDNASearchStore();

  return (
    <>
      <div className="w-2/3 bg-white px-4 py-2 rounded-md overflow-hidden min-h-[450px]">
        <div className="flex justify-between">
          <h2 className="font-semibold text-2xl mt-4">Preview </h2>
        </div>
        <div className="flex flex-wrap gap-4 h-full justify-center">
            {loading ? <Loading margin="mt-16" /> : products.map((product: RunDNASearchType, index)=>{
              if (product.productCode === currentProductCode){
                return (
                  <>
                    {product.imageUrls.map((url, index)=>{
                      return (
                        <div key={index}>
                          <Image className="rounded-md shadow-md" src={url} width={200} height={200} alt={currentProductCode + '-' + index}/>
                        </div>
                      )
                    })}
                  </>
                )
              }
            })}

        </div>
        
      </div>
    </>
  );
}
