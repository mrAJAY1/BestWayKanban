import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "@/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="lg:p-10 flex-grow flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
