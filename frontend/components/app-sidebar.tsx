'use client'

import * as React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { DatePicker } from "@/components/date-picker"
import { 
  Home, 
  Code2, 
  Network, 
  Layers, 
  Briefcase, 
  FileText, 
  PlaySquare 
} from "lucide-react"
import Link from "next/link"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

const navItems = [
  { name: "Dashboard", url: "/dashboard", icon: Home },
  { name: "Machine Coding", url: "/dashboard/machine-coding", icon: Code2 },
  { name: "DSA", url: "/dashboard/dsa", icon: Network },
  { name: "System Design", url: "/dashboard/system-design", icon: Layers },
  { name: "Placement Preparation", url: "/dashboard/placement-prep", icon: Briefcase },
  { name: "Blogs", url: "/dashboard/blogs", icon: FileText },
  { name: "Videos", url: "/dashboard/videos", icon: PlaySquare },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  // Format user data for NavUser component
  const userData = user ? {
    name: user.name,
    email: user.email,
    avatar: `/avatars/${user.name.toLowerCase().replace(/\s+/g, '-')}.jpg`, // Fallback avatar path
  } : null

  if (!userData) {
    return null
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={userData} />
      </SidebarHeader>
      <SidebarContent>
        {/* <DatePicker /> */}
        <SidebarGroup>
          {/* <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">
            Menu
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild tooltip={item.name} className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-md transition-colors">
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
