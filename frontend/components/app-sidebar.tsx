'use client'

import * as React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Calendars } from "@/components/calendars"
import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Sample calendar data
const calendarData = {
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
}

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
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={calendarData.calendars} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
