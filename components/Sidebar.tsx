"use client"

import { ChevronDown, Shield, Sparkles, UserPlus } from "lucide-react"
import { DashboardIcon, CalendarIcon, ChatIcon, FileIcon, HRMIcon, MilestoneIcon, NotesIcon, ProjectsIcon, TaskIcon } from "@/public/icons/icons"
import { FaPersonPraying, FaChurch } from "react-icons/fa6";
import { RiChatFollowUpFill } from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import Image from "next/image"
import { usePathname, useParams } from "next/navigation"
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useState } from "react";


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
    // {
    //   title: "Schedules",
    //   url: `/${slug}/schedules`,
    //   icon: CalendarIcon,
    // },
    // {
    //   title: "HRM",
    //   url: `/${slug}/hrm`,
    //   icon: HRMIcon,
    // },
    // {
    //   title: "Notes",
    //   url: `/${slug}/notes`,
    //   icon: NotesIcon,
    // },
    // {
    //   title: "Files",
    //   url: `/${slug}/files`,
    //   icon: FileIcon,
    // },
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
                      <a href={item.url} className="gap-4">
                        <div>
                          <item.icon className={`w-6 h-6 ${isActive ? "bg-sidebar-accent text-secondary-bg" : "text-gray-600"}`}/>
                        </div>
                        <span className={`font-bold text-sm ${isActive ? "bg-sidebar-accent text-secondary-bg" : "text-gray-600"}`}>{item.title}</span>
                      </a>
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
                              <a href={item.url} className="gap-4">
                                <div>
                                  <item.icon className={`w-6 h-6 ${isActive ? "bg-sidebar-accent text-secondary-bg" : "text-gray-600"}`}/>
                                </div>
                                <span className={`font-bold text-sm ${isActive ? "bg-sidebar-accent text-secondary-bg" : "text-gray-600"}`}>{item.title}</span>
                              </a>
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






// 'use client';

// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { useAuth } from "@/lib/hooks/useAuth";
// import { Button } from "components/ui/button";
// import { getMyTenants } from "lib/api-tenants";
// import { cn } from "lib/utils";
// import {
//     AlertTriangle,
//     BarChart2,
//     BookOpen,
//     Briefcase,
//     Building,
//     Calendar,
//     ChevronLeft,
//     ChevronRight,
//     Clock,
//     FileText,
//     Heart,
//     LayoutDashboard,
//     Megaphone,
//     Package,
//     Settings,
//     Sparkles,
//     TrendingUp,
//     UserPlus,
//     Users,
//     Menu
// } from "lucide-react";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";

// interface SidebarProps {
//   className?: string;
// }

// const Sidebar = ({ className }: SidebarProps) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const pathname = usePathname();
//   const params = useParams();
//   const slug = params?.slug as string;
//   const [tenant, setTenant] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const {subdomain} = useSelector((state: RootState) => state.tenant)


//   const company = subdomain || 'Company';

//   const navItems = [
//     {
//       name: "Dashboard",
//       href: `/${slug}/dashboard`,
//       icon: LayoutDashboard,
//       gradient: "from-purple-500 to-blue-500",
//     },
//     {
//       name: "Employees",
//       href: `/${slug}/employees`,
//       icon: Users,
//       gradient: "from-blue-500 to-emerald-500",
//     },
//     {
//       name: "Departments",
//       href: `/${slug}/departments`,
//       icon: Building,
//       gradient: "from-emerald-500 to-blue-500",
//     },
//     // {
//     //   name: "Calendar",
//     //   href: `/${slug}/calendar`,
//     //   icon: Calendar,
//     //   gradient: "from-emerald-500 to-blue-500",
//     // },
//     {
//       name: "Announcements",
//       href: `/${slug}/announcements`,
//       icon: Megaphone,
//       gradient: "from-pink-500 to-rose-500",
//     },
//     {
//       name: "Leaves",
//       href: `/${slug}/leaves`,
//       icon: Calendar,
//       gradient: "from-purple-500 to-rose-500",
//     },
//     {
//       name: "Attendance",
//       href: `/${slug}/attendance`,
//       icon: Clock,
//       gradient: "from-blue-500 to-purple-500",
//     },
//     {
//       name: "Payroll",
//       href: `/${slug}/payroll`,
//       icon: FileText,
//       gradient: "from-emerald-500 to-blue-500",
//     },
//     // {
//     //   name: "Reviews",
//     //   href: `/${slug}/reviews`,
//     //   icon: BarChart2,
//     //   gradient: "from-rose-500 to-purple-500",
//     // },
//     {
//       name: "Assets",
//       href: `/${slug}/assets`,
//       icon: Package,
//       gradient: "from-blue-500 to-emerald-500",
//     },
//     // {
//     //   name: "Onboarding",
//     //   href: `/${slug}/onboarding`,
//     //   icon: UserPlus,
//     //   gradient: "from-blue-500 to-emerald-500",
//     // },
//     {
//       name: "Recruitment",
//       href: `/${slug}/recruitment`,
//       icon: Briefcase,
//       gradient: "from-purple-500 to-blue-500",
//     },
//     // {
//     //   name: "Learning",
//     //   href: `/${slug}/learning`,
//     //   icon: BookOpen,
//     //   gradient: "from-emerald-500 to-blue-500",
//     // },
//     {
//       name: "Shoutouts",
//       href: `/${slug}/shoutouts`,
//       icon: Heart,
//       gradient: "from-rose-500 to-purple-500",
//     },
//     // {
//     //   name: "Grievances",
//     //   href: `/${slug}/grievance`,
//     //   icon: AlertTriangle,
//     //   gradient: "from-rose-500 to-purple-500",
//     // },
//     // {
//     //   name: "Promotions",
//     //   href: `/${slug}/promotions`,
//     //   icon: TrendingUp,
//     //   gradient: "from-purple-500 to-emerald-500",
//     // },
//     {
//       name: "Settings",
//       href: `/${slug}/settings`,
//       icon: Settings,
//       gradient: "from-emerald-500 to-purple-500",
//     },
//   ];

//   return (
//     <>
//       {/* Add a button for mobile to open sidebar */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
//           <Menu size={22} />
//         </Button>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-100"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       <TooltipProvider>
//         <aside
//           className={cn(
//             "bg-background/95 backdrop-blur-xl h-screen transition-all duration-100 relative flex flex-col border-r border-border/50 shadow-xl",
//             collapsed ? "w-17.5" : "w-70",
//             className,
//             mobileOpen ? "fixed z-50 left-0 top-0 w-4/5 max-w-xs md:static" : "hidden md:flex"
//           )}
//           style={mobileOpen ? { boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)', transition: 'box-shadow 100ms linear' } : { transition: 'box-shadow 100ms linear' }}
//         >
//           <div className="p-6 flex items-center justify-between border-b border-border/50">
//             <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
//               {
//                 tenant?.logoUrl ? (
//                   <div className="relative inline-block h-10 w-10 rounded-xl overflow-hidden shadow-lg">
//                     <Image
//                       src={tenant?.logoUrl}
//                       alt="logo"
//                       fill
//                       className="rounded-xl object-cover shadow-lg"
//                     />
//                   </div>
//                 ) : (
//                   <div className="bg-linear-to-br from-primary to-primary/80 rounded-xl h-10 w-10 flex items-center justify-center text-white font-bold shadow-lg">
//                     <Sparkles size={20} />
//                   </div>
//                 )
//               } 
//               {!collapsed && (
//                 <div>
//                   <h1 className="text-foreground text-xl font-bold">
//                     {company}
//                   </h1>
//                   {/* <p className="text-muted-foreground text-xs">Workforce Management</p> */}
//                 </div>
//               )}
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => {
//                 if (mobileOpen) setMobileOpen(false);
//                 else setCollapsed(!collapsed);
//               }}
//               className={cn(
//                 "text-foreground rounded-xl transition-all duration-200 z-20",
//                 collapsed ? "bg-accent/80 border border-primary shadow-lg hover:bg-accent/90 fixed left-3 top-6" : "hover:bg-accent/50"
//               )}
//               style={collapsed ? { position: 'fixed', left: 20, top: 24 } : {}}
//             >
//               {collapsed || mobileOpen ? <ChevronLeft size={18} /> : <ChevronRight size={22} />}
//             </Button>
//           </div>
          
//           <div className="py-6 grow overflow-y-auto">
//             <div className="space-y-2 px-4">
//               {navItems.map((item) => {
//                 const isActive = pathname === item.href ||
//                   (item.href === `/${slug}/communications/announcements` && pathname.startsWith(`/${slug}/communications`));
//                 return (
//                   collapsed ? (
//                     <Tooltip key={item.name} delayDuration={100}>
//                       <TooltipTrigger asChild>
//                         <Link
//                           href={item.href}
//                           className={cn(
//                             "group relative overflow-hidden flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-accent/50 justify-center",
//                             isActive && "bg-accent/50 text-foreground",
//                             !isActive && "text-muted-foreground hover:text-foreground"
//                           )}
//                         >
//                           <div className={cn(
//                             "p-2 rounded-lg bg-linear-to-br text-white shadow-lg",
//                             item.gradient
//                           )}>
//                             <item.icon size={18} />
//                           </div>
//                         </Link>
//                       </TooltipTrigger>
//                       <TooltipContent side="right" className="ml-2">
//                         {item.name}
//                       </TooltipContent>
//                     </Tooltip>
//                   ) : (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       onClick={() => {
//                         if (mobileOpen) setMobileOpen(false);
//                       }}
//                       className={cn(
//                         "group relative overflow-hidden flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-accent/50",
//                         isActive && "bg-accent/50 text-foreground",
//                         !isActive && "text-muted-foreground hover:text-foreground"
//                       )}
//                     >
//                       {isActive && (
//                         <div className={cn(
//                           "absolute inset-0 bg-linear-to-r opacity-10 rounded-lg",
//                           item.gradient
//                         )} />
//                       )}
//                       <div className={cn(
//                         "relative z-10 flex items-center gap-3"
//                       )}>
//                         <div className={cn(
//                           "p-2 rounded-lg bg-linear-to-br text-white shadow-lg",
//                           item.gradient
//                         )}>
//                           <item.icon size={18} />
//                         </div>
//                         <span className="font-medium">{item.name}</span>
//                       </div>
//                     </Link>
//                   )
//                 );
//               })}
//             </div>
//           </div>

//           {/* {!collapsed && (
//             <div className="p-4 border-t border-border/50">
//               <TenantSwitcher />
//             </div>
//           )} */}
//         </aside>
//       </TooltipProvider>
//     </>
//   );
// };

// export default Sidebar;
