"use client";

import { useCartStore } from "@/store/store";
import Link from "next/link";
import { LuPackageOpen } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RiImageEditFill } from "react-icons/ri";

const Navbar = () => {
  const { cart } = useCartStore();

  const router = useRouter()

  const cartCount = cart.length;
  let cartCountClass = "text-lg font-semibold ";
  cartCountClass +=
    cartCount === 0
      ? "text-slate-500"
      : cartCount > 0 && cartCount < 30
        ? "text-green-500"
        : "text-red-500";

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'GET' })
      if (response.redirected) {
        router.push(response.url)
      }
    } catch (error) {
      toast.error('Error logging out.', { autoClose: 3500 })
    }
  }

  return (
    <nav className="flex justify-between gap-4 w-full shadow-md py-4 px-8">
      <div className="">
        <Link href="/" title="ImgNext Home">
          <li className="font-semibold p-1 text-xl list-none">
            Img<span className="text-blue-500 ml-1">Next</span>
          </li>
        </Link>
      </div>
      <div className=" flex gap-8 items-center">
        <Link href="/edit-images" title="Edit Images">
          <li className="px-4 py-2 flex items-end gap-2 hover:bg-slate-200 rounded-md duration-200">
            <RiImageEditFill size={30} />
          </li>
        </Link>
        <Link href="/cargo" title={`Cargo: ${cartCount} items`}>
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
        <Link href={""} onClick={handleLogout} title="Logout">
          <li className="px-4 py-2 flex items-end gap-2 hover:bg-slate-200 rounded-md duration-200">
            <IoLogOutOutline size={30} />
          </li>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
