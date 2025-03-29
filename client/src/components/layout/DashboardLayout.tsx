import React from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <MobileHeader />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-5 md:p-8 mt-14 md:mt-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
