"use client";

import { useCartStore, useSearchStore } from "@/store/store";
import { SingleImageProps } from "@/types/ImageTypes";
import { singleImageDownload } from "@/utils/ImageParser";
import Image from "next/image";
import { useState } from "react";
import { MdDownload } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";
import { toast } from "react-toastify";

export default function SingleImage(props: SingleImageProps) {
  const [showImage, setShowImage] = useState<boolean>(true);
  const {cart, addToCart } = useCartStore();
  const {productCode} = useSearchStore();

  const handleSingleImageDownloadClick = async () => {
    try {
      await singleImageDownload(productCode, props.url);
    } catch (error) {
      console.log("Error downloading image.");
    }
  };

  const handleSingleCartClick = ()=>{
    let match = cart.find(item=> item === props.url);
    if(!match){
      addToCart(props.url);
    } else{
      toast.warning("Image already in cart.", {autoClose: 2500});
    }
  }

  return showImage ? (
    <li className="list-none relative group">
      <Image
        id={props.id}
        src={props.url}
        width={200}
        height={200}
        alt={props.alt}
        className="shadow-md rounded-md object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center bg-slate-300 py-2 hidden group-hover:flex transition-opacity duration-300">
        <button
          onClick={handleSingleImageDownloadClick}
          title="download image"
          className="hover:bg-slate-400 text-black px-4 py-2 rounded-md transition-colors duration-200"
        >
          <MdDownload size={15}/>
        </button>
        <button
        title="add to cargo"
          onClick={handleSingleCartClick}
          className="hover:bg-slate-400 text-black px-4 py-2 rounded-md transition-colors duration-200"
        >
          <LuPackagePlus size={15}/>
        </button>
      </div>
    </li>
  ) : (
    <li className="list-none">
      <h2 className="text-red-500">Image not found</h2>
    </li>
  );
}
