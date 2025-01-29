"use client";

import SingleImage from "./SingleImage";
import { previewImagesDownload } from "@/utils/ImageParser";
import { v4 as uuid } from "uuid";
import ExampleImages from "./Example";
import { useCartStore, useSearchStore } from "@/store/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LuPackagePlus } from "react-icons/lu";
import Loading from "./Loading";

const Preview = () => {
  const {productCode, imageUrls, loading } = useSearchStore();
  const { cart, addSetToCart } = useCartStore();
  const [validImageUrls, setValidImageUrls] = useState<string[]>([]);

  const handleDownloadClick = async () => {
    try {
      await previewImagesDownload(productCode, imageUrls);
    } catch (error) {
      console.log("Error downloading image.");
    }
  };

  const handleCartSetClick = () => {
    console.log(imageUrls)
    let matchCount = 0;
    imageUrls.forEach((url, index) => {
      let match = cart.findIndex((item) => item === url);
      if (match === -1) {
        addSetToCart(imageUrls[index]);
      } else {
        matchCount++;
      }
    });
    if (matchCount === imageUrls.length) {
      if(matchCount === 0){
        toast.warn("Cant do that!", {autoClose: 3000})
        return
      }
      console.log(cart)
      toast.warning("All images already in cart.", { autoClose: 2500 });
    } else if (matchCount > 0) {
      toast.warning(`${matchCount} ${matchCount === 1 ? `image` : `images`} already in cart.`, {
        autoClose: 2500,
      });
    } else {
      toast.success("Set added to cart.", { autoClose: 2500 });
    }
  };


  return (
    <div className="w-2/3 bg-white px-4 py-2 rounded overflow-hidden min-h-[450px]">
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl mt-4">Preview </h2>
        <div className="flex items-center gap-8">
          <button
            onClick={handleDownloadClick}
            title="download set as zip file"
            className="py-2 px-4 bg-black rounded text-white text-md font-semibold cursor-pointer hover:bg-stone-600 duration-200"
          >
            Download
          </button>
          <button
            title="add set to cargo"
            onClick={handleCartSetClick}
            className="py-2 px-4 bg-black rounded text-white text-md font-semibold cursor-pointer hover:bg-stone-600 duration-200"
          >
            <LuPackagePlus size={25} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {imageUrls.length === 0 ? (
          <ExampleImages />
        ) : (loading ? <Loading margin="mt-8"/> :  (
          imageUrls.map((img, index) => {
            return (
              <SingleImage
                key={index}
                url={img}
                alt="Product Image"
                id={uuid()}
              />
            );
          })
        ))}
      </div>
    </div>
  );
};

export default Preview;
