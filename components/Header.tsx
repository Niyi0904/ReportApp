import { ChevronDown } from "lucide-react";
import { UserMenu } from "./user/userMenu";

export const Header = () => {
  return (
    <header className="flex items-center justify-end">
      <UserMenu />
      <ChevronDown size={20} className="text-muted-foreground"/>
    </header>
  );
};
