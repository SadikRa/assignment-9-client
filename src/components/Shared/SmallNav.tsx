/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  RiMenu3Fill,
  RiShoppingCartFill,
  RiDashboardHorizontalFill,
} from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "@/public/review/stars.gif";

const NavbarItems = [
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function SmallNavbar({
  user,
  cartCount,
  handleLogOut,
  onCartClick,
}: {
  user: any;
  cartCount: number;
  handleLogOut: () => void;
  onCartClick: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center justify-between px-5 h-16 border-b bg-background sticky top-0 z-30">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
        <Image alt="logo" src={logo} height={40} width={40} />
        <span className="font-black text-lg text-gray-700">Criti</span>
        <span className="font-black text-lg text-yellow-400">Check</span>
      </Link>

      {/* Icons */}
      <div className="flex items-center gap-3">
        <Button
          onClick={onCartClick}
          variant="outline"
          className="rounded-full size-10 flex items-center justify-center"
        >
          <RiShoppingCartFill className="w-5 h-5" />
          <span className="text-red-500 text-xs ml-1">{cartCount}</span>
        </Button>

        {/* Hamburger */}
        <button className="text-gray-700" onClick={() => setMenuOpen(true)}>
          <RiMenu3Fill className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay + Sliding Drawer */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          menuOpen ? "bg-black bg-opacity-40 visible" : "invisible opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md p-4 z-40 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Menu</h2>

          {NavbarItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.path}
              className="block py-2 px-2 rounded hover:bg-yellow-100 font-semibold transition-all duration-200 ease-in-out"
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 mt-4 cursor-pointer">
                    <Avatar className="border-2 border-yellow-400 h-8 w-8">
                      <AvatarImage src={user?.user?.profileImage} />
                      <AvatarFallback>
                        <Image
                          src="https://github.com/shadcn.png"
                          alt="User"
                          height={30}
                          width={30}
                          className="rounded-full"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Account</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex gap-2 items-center">
                      <FaUserTie /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex gap-2 items-center">
                      <RiDashboardHorizontalFill /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogOut();
                    }}
                    className="bg-red-500 text-white cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="w-full mt-3">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
