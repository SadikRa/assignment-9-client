/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/contants";
import Image from "next/image";
import { NavMain } from "./nav-main";

export function NavUser({ items }: { items: any[] }) {
  const { isMobile } = useSidebar();
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setIsLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={user?.user?.name} />
                <AvatarFallback className="rounded-lg">
                  <Image
                    src={"https://github.com/shadcn.png"}
                    alt="User"
                    height={50}
                    width={50}
                    className="rounded-full"
                  ></Image>
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.user?.name}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user?.user?.name} />
                  <AvatarFallback className="rounded-lg">
                    <Image
                      src={"https://github.com/shadcn.png"}
                      alt="User"
                      height={50}
                      width={50}
                      className="rounded-full"
                    ></Image>
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.user?.name}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
              <NavMain items={items} />
            </DropdownMenuLabel>

            <DropdownMenuItem onClick={() => handleLogout()}>
              <p className="hover:bg-red-500 hover:text-white w-full h-full p-2 rounded-md flex items-center gap-2 justify-start text-sm font-normal text-red-500 cursor-pointer">
                <LogOut className={"text-black hover:text-white"} /> Log Out
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
