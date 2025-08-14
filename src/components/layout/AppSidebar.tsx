import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Building2, BookPlus, BookText, BookMinus, LayoutList } from "lucide-react";
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

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Members", url: "/member", icon: Building2 },
  { title: "GS1-128", url: "/gs1-128", icon: BookText },
  { title: "GLN", url: "/gln", icon: BookPlus },
   { title: "GTIN", url: "/gtin", icon: LayoutList },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-[#002B6E] text-white ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-lg">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
