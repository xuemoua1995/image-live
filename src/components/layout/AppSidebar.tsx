import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  BookText,
  BookPlus,
  LayoutList,
  LogOut,
  Newspaper
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Sidebar menu items
const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Members", url: "/member", icon: Building2 },
  { title: "GS1-128", url: "/gs1-128", icon: BookText },
  { title: "GLN", url: "/gln", icon: BookPlus },
  { title: "GTIN", url: "/gtin", icon: LayoutList },
  { title: "News", url: "/news", icon: Newspaper },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login"); // <-- navigate to another page
    }, 1000); // simulate async action
  };
  const getButtonClasses = (isActive: boolean) =>
    [
      "flex items-center w-full px-3 py-2 rounded-md transition-colors",
      isActive
        ? "bg-orange-600 text-white"
        : "hover:bg-orange-600 hover:text-white text-gray-200",
    ].join(" ");

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-[#002B6E] text-white flex flex-col justify-between">
        {/* Main navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-white">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-10">
            <SidebarMenu>
              {menuItems.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <NavLink to={url} end>
                    {({ isActive }) => (
                      <SidebarMenuButton className={getButtonClasses(isActive)}>
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout button */}
        <div className="p-4">
          <button
            onClick={handleClick}
            disabled={loading}
            className="flex items-center gap-2 w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {loading ? "Loding..." : "Logout"}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
