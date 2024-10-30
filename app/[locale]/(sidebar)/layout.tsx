import ConvexClientProvider from "@/components/ConvexClientProvider";
import { cn } from "@/lib/utils";
import {
  MdBarChart,
  MdHome,
  MdOutlineApps,
  MdOutlineDescription,
  MdOutlineInbox,
  MdOutlineInventory2,
  MdOutlineListAlt,
  MdOutlineSettings,
  MdOutlineTimer,
} from "react-icons/md";
import Link from "next/link";
import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider>
      <div className="relative">
        <Sidebar />
        <div className="mx-4 md:ml-[95px] md:mr-10 pb-8">
          <Header />
          {children}
        </div>
      </div>
    </ConvexClientProvider>
  );
}

function ProductMenu() {
  return (
    <aside className="w-48 border-r bg-muted/40 p-2">
      <nav className="flex h-full max-h-screen flex-col gap-2">
        <MenuLink href="/">
          <MdHome className="h-4 w-4" />
          Home
        </MenuLink>

        <MenuLink href="/overview" active>
          <MdBarChart className="h-4 w-4" />
          Overview
        </MenuLink>

        <MenuLink href="/inbox">
          <MdOutlineInbox className="h-4 w-4" />
          Inbox
        </MenuLink>

        <MenuLink href="/transactions">
          <MdOutlineListAlt className="h-4 w-4" />
          Transactions
        </MenuLink>

        <MenuLink href="/invoices">
          <MdOutlineDescription className="h-4 w-4" />
          Invoices
        </MenuLink>

        <MenuLink href="/tracker">
          <MdOutlineTimer className="h-4 w-4" />
          Tracker
        </MenuLink>

        <MenuLink href="/vault">
          <MdOutlineInventory2 className="h-4 w-4" />
          Vault
        </MenuLink>

        <MenuLink href="/apps">
          <MdOutlineApps className="h-4 w-4" />
          Apps
        </MenuLink>

        <MenuLink href="/settings">
          <MdOutlineSettings className="h-4 w-4" />
          Settings
        </MenuLink>
      </nav>
    </aside>
  );
}

function MenuLink({
  active,
  href,
  children,
}: {
  active?: boolean;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium  text-muted-foreground transition-all hover:text-primary",
        active && "bg-muted text-primary",
      )}
    >
      {children}
    </Link>
  );
}
