"use client";

import { useRunDNASearchStore } from "@/store/store";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function RunDNADetails() {
  const { products, deleteProduct } = useRunDNASearchStore();

  const handleDummyButton = (which: string)=>{
    const buttonNameArr = which.split(" ").map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    const btnName = buttonNameArr.join(" ");
    toast.warning(`${btnName} button was clicked. But I ain't doing anything.`, {
      autoClose: 3000,
    });
  }

  return (
    <>
      <div className="mt-4 bg-white min-h-80 rounded-md px-4 py-8">
        <div className="flex justify-between">
          <h2 className="font-semibold text-2xl">Products Added</h2>

          <div className="flex gap-4">
            <button onClick={()=>handleDummyButton("clear all")} className="py-2 px-4 bg-red-400 hover:bg-red-500 rounded-md text-white font-semibold duration-200 cursor-pointer">Clear All</button>
            <button onClick={()=>handleDummyButton("download template")} className="py-2 px-4 bg-emerald-400 rounded-md text-white text-md font-semibold cursor-pointer hover:bg-emerald-500 duration-200">
              Download Template
            </button>

          </div>
        </div>
        <p className="text-md px-4 py-2 mt-2 rounded-[4px] bg-orange-300 w-fit flex gap-4 items-center justify-center">
          <BsInfoCircleFill className="inline-block" fill="white" size={25} />
          <span>
            Download Template will download the Shopify template filled with the
            image urls.
          </span>
        </p>

        <div className="overflow-x-auto mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5"
                >
                  Product Code
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap w-2/5">
                    {product.productCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-2/5">
                    <Image
                      width={100}
                      height={100}
                      src={product.imageUrls[0]}
                      alt={product.productCode}
                      className=" object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/5">
                    <button onClick={()=>deleteProduct(product.productCode)} className="bg-red-400 hover:bg-red-500 duration-200 px-4 py-2 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
