import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

export default function MobileHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="md:hidden bg-white shadow-sm w-full fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-500 hover:text-neutral-700 focus:outline-none focus:text-neutral-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold text-neutral-800">CompreAqui</h1>
          </div>
          <div className="flex items-center">
            <button className="flex items-center focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-neutral-600 flex items-center justify-center">
                <span className="text-white text-sm">JS</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 z-30 w-64 md:hidden">
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
}
