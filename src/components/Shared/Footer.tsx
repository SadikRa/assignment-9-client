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
            <span className="text-gray-700">Criti</span>
            <span className="text-yellow-400">Check</span>
          </h1>
        </Link>
        <p className="mt-2 text-gray-500 w-2/3">
          A trusted platform where users share honest product reviews, ratings,
          and insights to help others make smarter buying decisions.
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
          &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
