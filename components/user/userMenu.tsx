"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { logout } from "@/app/redux/features/auth/authSlice";
import { useEffect, useState } from "react";

export const UserMenu = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  // Mark that component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⚠️ Prevent SSR render mismatch

  if (!user) return null;

  const handleLogout = async () => {
    try {
      // Clear session cookie
      await fetch("/api/auth/logout", { method: "POST" });
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear Redux state
      dispatch(logout());
      
      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still proceed with local logout
      dispatch(logout());
      router.push("/login");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center outline-none">
        <Avatar className="h-12 w-12 cursor-pointer">
          <AvatarImage src={user.photoURL || ""} />
          <AvatarFallback className="bg-secondary-bg text-white font-bold text-xl">
            {user.displayName?.[0] || user.email?.[0] || "?"}
          </AvatarFallback>
        </Avatar>
        <ChevronDown size={20} className="text-muted-foreground"/>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {/* USER INFO */}
        <DropdownMenuLabel className="flex gap-3 items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.photoURL || ""} />
            <AvatarFallback className="bg-secondary-bg text-white font-bold text-xl">
              {user.displayName?.[0] || user.email?.[0] || "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium">
              {user.displayName}
            </span>
            <span className="text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* ACTIONS */}
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
