"use client";
import logo from "../../public/review/stars.gif";
import { LogOut } from "lucide-react";
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
import SmallNavbar from "./SmallNav";

const NavbarItems = [
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

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
    <header className="border-b bg-background w-full sticky top-0 z-30">
      <SmallNavbar
        user={user}
        cartCount={user && cartItem?.length ? cartItem.length : 0}
        handleLogOut={handleLogOut}
        onCartClick={() => setIsOpen(!isOpen)}
      />
      <div className="hidden md:block ">
        <div className="container flex justify-between items-center mx-auto h-16 px-5">
          <Link href="/">
            <h1 className="text-2xl gap-1 font-black flex items-start">
              <Image alt="logo" src={logo} height={50} width={50} />{" "}
              <span className="text-gray-700">Criti</span>
              <span className="text-yellow-400">Check</span>
            </h1>
          </Link>
          <nav>
            <ul className="flex gap-5">
              <li>
                {NavbarItems.map((navitem) => (
                  <Link
                    key={navitem.name}
                    href={navitem.path}
                    className={`p-2 font-extrabold ${
                      pathname === navitem.path
                        ? "text-yellow-400"
                        : "text-gray-700 hover:text-yellow-400"
                    }`}
                  >
                    {navitem.name}
                  </Link>
                ))}
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

            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer border-yellow-400 border-2 h-10 w-10 p-1">
                      <AvatarImage src={`${user?.user?.profileImage}`} />
                      <AvatarFallback>
                        <Image
                          src={"https://github.com/shadcn.png"}
                          alt="User"
                          height={50}
                          width={50}
                          className="rounded-full"
                        ></Image>
                      </AvatarFallback>
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
                        href={`/dashboard`}
                      >
                        <RiDashboardHorizontalFill />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
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
                <Button className="rounded-lg cursor-pointer" variant="outline">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
