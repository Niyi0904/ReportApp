import { ChevronDown } from "lucide-react";
import { UserMenu } from "./user/userMenu";

export const Header = () => {
  return (
    <header className="justify-end">
      <UserMenu />
    </header>
  );
};
