import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "@/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-wrap">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
