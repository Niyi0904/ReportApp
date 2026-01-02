import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import SessionRestorer from "@/components/sessionRestorer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3">
        <SidebarProvider>
                    <SessionRestorer/>

            <AppSidebar />
                <SidebarInset>
                    <div className="flex items-center justify-between w-full bg-primary-bg gap-5 pt-3 px-2">
                        <SidebarTrigger />
                        {/* <div className="w-px h-4 bg-gray-200" /> */}
                        <Header />
                    </div>
                    <div className="pt-2">
                        {children}
                    </div>
                </SidebarInset>
        </SidebarProvider>
    </div>
  )
}