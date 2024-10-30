import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface UserMenuProps {
  onlySignOut?: boolean;
}

export function UserMenu({ onlySignOut = false }: UserMenuProps) {
  const user = useQuery(api.users.viewer);
  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-full w-8 h-8 cursor-pointer">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name || ""}
              width={32}
              height={32}
            />
          )}
          <AvatarFallback>
            <span className="text-xs">
              {user.name?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" sideOffset={10} align="end">
        {!onlySignOut && (
          <>
            <DropdownMenuLabel>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="truncate line-clamp-1 max-w-[155px] block">
                    {user.name || "Anonymous"}
                  </span>
                  <span className="truncate text-xs text-[#606060] font-normal">
                    {user.email || "No email"}
                  </span>
                </div>
                <div className="border py-0.5 px-3 rounded-full text-[11px] font-normal">
                  Beta
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link prefetch href="/account">
                <DropdownMenuItem>
                  Account
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>

              <Link prefetch href="/account/support">
                <DropdownMenuItem>Support</DropdownMenuItem>
              </Link>

              <Link prefetch href="/account/teams">
                <DropdownMenuItem>
                  Teams
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <div className="flex flex-row justify-between items-center p-2">
              <p className="text-sm">Language</p>
              <LanguageSwitcher />
            </div>

            <DropdownMenuSeparator />
            <div className="flex flex-row justify-between items-center p-2">
              <p className="text-sm">Theme</p>
              <ThemeToggle />
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SignOutButton() {
  const { signOut } = useAuthActions();
  return (
    <DropdownMenuItem onClick={() => void signOut()}>Sign out</DropdownMenuItem>
  );
}
