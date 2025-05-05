"use client";
import logo from "../../public/cook.gif";
import { LogOut, LucideFilePlus2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/contants";
import { RiDashboardHorizontalFill, RiShoppingCartFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { clearCart, orderedProductsSelector } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import CartSidebar from "../ui/core/Cart";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(orderedProductsSelector);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    dispatch(clearCart());
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-10">
      <div className="container flex justify-between items-center mx-auto h-16 px-5">
        <Link href="/">
          <h1 className="text-2xl gap-2 font-black flex items-center">
            <Image alt="logo" src={logo} height={50} width={50} />{" "}
            <span className="text-slate-400">Plated</span>
            <span className="text-yellow-400">4U</span>
          </h1>
        </Link>
        <nav>
          <ul className="flex gap-5">
            <li>
              <Link
                href="/meals"
                className={`${
                  pathname === "/meals"
                    ? "text-yellow-400 font-bold"
                    : "text-gray-700 hover:text-yellow-400"
                }`}
              >
                Meals
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${
                  pathname === "/about"
                    ? "text-yellow-400 font-bold"
                    : "text-gray-700 hover:text-yellow-400"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`${
                  pathname === "/contact"
                    ? "text-yellow-400 font-bold"
                    : "text-gray-700 hover:text-yellow-400"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="flex gap-2">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            className="rounded-full size-10 flex items-center cursor-pointer gap-0"
          >
            <RiShoppingCartFill className="w-5 h-5 mt-1" />
            <span className="text-red-500 font-bold pb-4">
              {user && cartItem?.length ? cartItem?.length : "0"}
            </span>
          </Button>
          <CartSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          {user?.email ? (
            <>
              <Link href="/add-meal">
                <Button className="rounded-full cursor-pointer">
                  <LucideFilePlus2 /> Customized Meal
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer border-yellow-400 border-2 h-10 w-10 p-1">
                    <AvatarImage
                      src={`${user.imgUrl}` || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      className="flex gap-2 items-center justify-center "
                      href={"/profile"}
                    >
                      <FaUserTie />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      className="flex items-center justify-center gap-2"
                      href={`/${user?.role}/dashboard`}
                    >
                      <RiDashboardHorizontalFill />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-500 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-lg" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
