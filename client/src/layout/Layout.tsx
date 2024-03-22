import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "@/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <main className="lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
