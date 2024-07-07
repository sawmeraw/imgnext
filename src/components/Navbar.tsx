"use client";

import { useCartStore } from "@/store/store";
import Link from "next/link";
import { LuPackageOpen } from "react-icons/lu";

const Navbar = ()=>{

  const {cart} = useCartStore();

  const cartCount = cart.length;
  let cartCountClass = "text-lg font-semibold ";
  cartCountClass += cartCount === 0 ? "text-slate-500" : cartCount > 0 && cartCount < 30 ? "text-green-500" : "text-red-500";

    return(
        <nav className="flex justify-between gap-4 w-full shadow-md py-4 px-8">
          <ul className="">
            <Link href="/" title="ImgNext Home"><li className="font-semibold p-1 text-xl">Img<span className="text-orange-500 ml-1">Next</span></li></Link>
          </ul>
          <ul className=" flex gap-8 items-center">
            <Link href="/cargo" title={`cargo: ${cartCount} items`}>
              <li className="px-4 py-2 flex items-end gap-2 hover:bg-slate-200 rounded-md duration-200">
              <LuPackageOpen size={30}/>
              <span className={cartCountClass}>{cartCount}</span>
              </li>
            </Link>
            <Link href="/about" title="about page"><li className="text-lg px-2 py-2 rounded-md hover:bg-slate-200 duration-200 hover:shadow-md">About</li></Link>
          </ul>
      </nav>
    )
}

export default Navbar;