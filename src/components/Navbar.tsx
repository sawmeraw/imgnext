"use client";

import { useCartStore } from "@/store/store";
import Link from "next/link";
import { LuPackageOpen } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  const { cart } = useCartStore();

  const cartCount = cart.length;
  let cartCountClass = "text-lg font-semibold ";
  cartCountClass +=
    cartCount === 0
      ? "text-slate-500"
      : cartCount > 0 && cartCount < 30
      ? "text-green-500"
      : "text-red-500";

  return (
    <nav className="flex justify-between gap-4 w-full shadow-md py-4 px-8">
      <ul className="">
        <Link href="/" title="ImgNext Home">
          <li className="font-semibold p-1 text-xl">
            Img<span className="text-blue-500 ml-1">Next</span>
          </li>
        </Link>
      </ul>
      <ul className=" flex gap-8 items-center">
       <Link href="/cargo" title={`cargo: ${cartCount} items`}>
          <li className="px-4 py-2 flex items-end gap-2 hover:bg-slate-200 rounded-md duration-200">
            <LuPackageOpen size={30} />
            <span className={cartCountClass}>{cartCount}</span>
          </li>
        </Link>
               <Link href="/config" title="Set Configuration">
          <li className="px-4 py-2 flex items-end gap-2 hover:bg-slate-200 rounded-md duration-200">
            <IoSettingsOutline size={30} />
          </li>
        </Link>
        <Link href="/logout" title="Set Configuration">
          <li className="px-4 py-2 flex items-end gap-2 hover:bg-slate-200 rounded-md duration-200">
            <IoLogOutOutline size={30} />
          </li>
        </Link>
        
      </ul>
    </nav>
  );
};

export default Navbar;
