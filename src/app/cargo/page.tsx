"use client";

import PageWrapper from "@/components/PageWrapper";
import { useCartStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, downloadCart } = useCartStore();

  const buttonClasses = "duration-200 px-4 py-2 rounded text-white";

  return (
    <PageWrapper>
      <div className="w-full bg-white px-8 py-6 rounded-md overflow-hidden min-h-[1000px]">
        <Link href="/" className="hover:underline font-semibold">
          {" "}
          ...Back
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
              className={`bg-green-400 hover:bg-green-500 ${buttonClasses}`}
              onClick={downloadCart}
              title="download all"
            >
              Download
            </button>
          </div>
        </div>
        <p className="text-xs mt-4 text-red-600">Download clears the cargo.</p>
        <div className="overflow-x-auto mt-8">
      {cart.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap w-2/5">
                  <input
                    type="text"
                    value={item}
                    disabled
                    className="w-full p-2 bg-slate-800 rounded-md text-white"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-2/5">
                  <Image
                    src={item}
                    alt="Product Image"
                    width={60}
                    height={60}
                    className="object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/5">
                  <button
                    className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded duration-300"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-16">
          <p className="text-2xl">
            No items in the <strong>CARGO</strong>
          </p>
        </div>
      )}
    </div>
      </div>
    </PageWrapper>
  );
}
