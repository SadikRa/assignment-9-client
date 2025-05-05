import React, { ReactNode } from "react";

interface CustomContainerProps {
  children: ReactNode;
  className?: string;
}

const CustomContainer = ({
  children,
  className = "",
}: CustomContainerProps) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>{children}</div>
  );
};

export default CustomContainer;
