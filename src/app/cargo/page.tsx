"use client";

import PageWrapper from "@/components/PageWrapper";
import { useCartStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, downloadCart } = useCartStore();

  const buttonClasses = "duration-200 px-4 py-2 rounded-md";

  return (
    <PageWrapper>
      <div className="w-full bg-white px-8 py-6 rounded-md overflow-hidden min-h-[1000px]">
        <Link href="/" className="hover:underline font-semibold">
          {" "}
          ~Back
        </Link>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl mt-4 font-semibold">
            Cargo <span className="text-sm">(Not a Cart)</span>
          </h2>
          <div className="flex gap-6 items-center">
            <button
              className={`bg-red-400 hover:bg-red-500 ${buttonClasses}`}
              onClick={clearCart}
              title="clear the cargo"
            >
              Clear
            </button>
            <button
              className={`bg-green-300 hover:bg-green-400 ${buttonClasses}`}
              onClick={downloadCart}
              title="download all"
            >
              Download
            </button>
          </div>
        </div>
        <p className="text-xs mt-4 text-red-600">Download clears the cargo.</p>
        <div className="flex flex-col gap-4 mt-8 h-full">
          {cart.length > 0 ? (
            cart.map((item, index) => {
              return (
                <div key={index} className="flex justify-around">
                  <Image
                    src={item}
                    alt="Product Image"
                    width={60}
                    height={60}
                  ></Image>
                  <button
                    className={`${buttonClasses} bg-red-400 hover:bg-red-500`}
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                  <input
                    type="text"
                    value={item}
                    disabled
                    className="w-1/4 p-2 bg-slate-800 rounded-md text-white"
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center mt-16">
              <p className="text-2xl">No items in the <strong>CARGO</strong></p>
              
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
