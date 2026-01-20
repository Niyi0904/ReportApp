"use client"

import { ChevronDown, Shield, Sparkles, UserPlus } from "lucide-react"
import { DashboardIcon } from "@/public/icons/icons"
import { FaPersonPraying, FaChurch } from "react-icons/fa6";
import { RiChatFollowUpFill } from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { usePathname, useParams } from "next/navigation"
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import Link from "next/link";


export function AppSidebar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string

  const user = useSelector((state: RootState) => state.auth.user);


  const adminItems = [
    {
      title: "Onboarding",
      url: "/onboarding",
      icon: UserPlus,
    },
    {
      title: "Members",
      url: "/members",
      icon: MdGroups2,
    },
  ];

  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "Prayer chain",
      url: "/prayer-chain",
      icon: FaPersonPraying,
    },
    {
      title: "Evangelism",
      url: "/evangelism",
      icon: FaChurch,
    },
    {
      title: "Follow Up",
      url: "/follow-up",
      icon: RiChatFollowUpFill,
    },
  ]


  return (
    <Sidebar collapsible="icon" className="">
      <SidebarHeader className="pt-4">
        <div className="flex items-center justify-between border-b px-4 pb-2">
          <div className="flex items-center gap-4">
            <div className="bg-secondary-bg rounded-xl h-10 w-10 flex items-center justify-center text-white font-bold shadow-lg">
              <Sparkles size={20} />
            </div>

            <p className="group-data-[collapsible=icon]:hidden text-base font-bold">{user?.displayName}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>

          <div className="pl-3">
            <SidebarGroupContent>
              <SidebarMenu className="spcae-y-5">
                {items.map((item) => {
                  const isActive = pathname === item.url
                  return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className={`${isActive && "bg-sidebar-accent"}`} asChild>
                      <Link href={item.url} className="gap-4">
                        <div>
                          <item.icon className={`w-6 h-6 ${isActive ? "bg-sidebar-accent text-secondary-bg" : "text-gray-600"}`}/>
                        </div>
                        <span className={`font-bold text-sm ${isActive ? "bg-sidebar-accent text-secondary-bg" : "text-gray-600"}`}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )})}
                {/* ADMIN DROPDOWN */}
                {
                  user?.status === "admin" && (
                    <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setAdminOpen((prev) => !prev)}
                        className="gap-4 justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <Shield className="w-6 h-6 text-gray-600" />
                          <span className="font-bold text-sm text-gray-600 group-data-[collapsible=icon]:hidden">
                            Admin
                          </span>
                        </div>
    
                        <ChevronDown
                          className={`w-4 h-4 transition-transform group-data-[collapsible=icon]:hidden ${
                            adminOpen ? "rotate-180" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    {adminOpen &&
                      adminItems.map((item) => {
                        const isActive = pathname === item.url;
    
                        return (
                          <SidebarMenuItem key={item.title} className="ml-6">
                            <SidebarMenuButton
                              asChild
                              className={`${isActive && "bg-sidebar-accent"}`}
                            >
                              <Link href={item.url} className="gap-4">
                                <div>
                                  <item.icon className={`w-6 h-6 ${isActive ? "bg-sidebar-accent text-secondary-bg" : "text-gray-600"}`}/>
                                </div>
                                <span className={`font-bold text-sm ${isActive ? "bg-sidebar-accent text-secondary-bg" : "text-gray-600"}`}>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })
                    }
                    </>
                  )
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* <SidebarFooter className="pt-4">
        <div className="flex items-center px-2 justify-between border-t border-secondary-bg py-4">
          <div className="flex items-center gap-6">
            <Image
              src="/icons/manage_accounts-icon.svg"
              alt="Google Icon"
              width={24}
              height={24}
            />

            <p className="font-bold text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">General</p>
          </div>


          <Image
            src="/icons/expand-icon.svg"
            alt="Google Icon"
            width={10}
            height={10}
          />
        </div>
      </SidebarFooter> */}
    </Sidebar>
  )
}