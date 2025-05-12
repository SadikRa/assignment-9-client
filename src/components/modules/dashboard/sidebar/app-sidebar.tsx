"use client";

import * as React from "react";
import {
  Bot,
  LifeBuoy,
  PieChart,
  Settings,
  SquareTerminal,
  SquareKanban,
  ChartNoAxesCombined,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import logo from "../../../../public/review/stars.gif";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const data = {
  navCommon: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
  ],

  navAdmin: [
    {
      title: "Manage Products",
      url: "/dashboard/admin/product",
      icon: Bot,
      items: [
        {
          title: "Create Product",
          url: "/dashboard/admin/product/create-product",
        },
      ],
    },
    {
      title: "Manage Reviews",
      url: "/dashboard/admin/reviews",
      icon: SquareKanban,
    },
    {
      title: "Payment Analytics",
      url: "/dashboard/admin/analytics",
      icon: ChartNoAxesCombined,
    },
  ],

  navUser: [
    {
      title: "My Reviews",
      url: "/dashboard/user/reviews",
      icon: LifeBuoy,
    },
    {
      title: "My Payments",
      url: "/dashboard/user/payments",
      icon: PieChart,
    },
  ],
  navFooter: [
    {
      title: "Settings",
      url: "/profile",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center"></div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h1 className="text-2xl gap-1 font-black flex items-start">
                    <Image alt="logo" src={logo} height={50} width={50} />{" "}
                    <span className="text-gray-700">Criti</span>
                    <span className="text-yellow-400">Check</span>
                  </h1>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navCommon} />
        {/* <NavMain items={data.navAdmin} />
        <NavMain items={data.navUser} /> */}

        {user?.role === "ADMIN" && <NavMain items={data.navAdmin} />}
        {user?.role === "USER" && <NavMain items={data.navUser} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser items={data.navFooter} />
      </SidebarFooter>
    </Sidebar>
  );
}
