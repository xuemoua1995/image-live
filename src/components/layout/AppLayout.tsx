import { useState, useRef, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { UserRoundCog } from "lucide-react";

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex items-center gap-3 px-4 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="mr-1" />
            <span className="text-sm text-muted-foreground">Admin Console</span>

            {/* UserSearch Dropdown */}
            <div className="ml-auto relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-center p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
                aria-label="Search Users"
              >
                <UserRoundCog />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-50">
                  <ul className="py-1 text-sm text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100 text-lg font-bold">
                      Adminstrator
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Setting
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 container py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
