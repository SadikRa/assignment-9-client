import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "@/public/cook.gif";

export default function Footer() {
  return (
    <footer className="py-8 border text-white text-center">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        <Link href="/">
          <h1 className="text-2xl gap-2 font-black flex items-center">
            <Image alt="logo" src={logo} height={50} width={50} />{" "}
            <span className="text-slate-400">Plated</span>
            <span className="text-yellow-400">4U</span>
          </h1>
        </Link>
        <p className="mt-2 text-gray-500">
          Delicious meals delivered to your doorstep.
        </p>

        <div className="flex justify-center space-x-6 mt-4">
          <Link
            href="#"
            className="text-gray-400 hover:text-yellow-400 hover:scale-150 duration-500 transition"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-yellow-400 hover:scale-150 duration-500 transition"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-yellow-400 hover:scale-150 duration-500 transition"
          >
            <FaInstagram size={20} />
          </Link>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MealBox. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
