"use client";

import UserProvider from "@/context/UserContext";
import StoreProvider from "./StoreProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <StoreProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </StoreProvider>
    </UserProvider>
  );
};

export default Providers;
