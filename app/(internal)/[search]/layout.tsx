import { HeaderComponent } from "@/components/header.component";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  );
};

export default layout;
