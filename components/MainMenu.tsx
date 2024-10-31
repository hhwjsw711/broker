"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { updateMenuAction } from "@/actions/update-menu-action";
import { useMenuStore } from "@/store/menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClickAway } from "@uidotdev/usehooks";
import { Reorder, motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLongPress } from "use-long-press";
import {
  MdOutlineDescription,
  MdOutlineInventory2,
  MdOutlineTimer,
  MdOutlineApps,
  MdOutlineSettings,
  MdOutlineInbox,
  MdBarChart,
  MdAdd,
  MdOutlineListAlt,
  MdRemove,
} from "react-icons/md";

type MenuItem = {
  path: string;
  name: string;
};

const icons: Record<string, () => JSX.Element> = {
  "/": () => <MdBarChart size={22} />,
  "/transactions": () => <MdOutlineListAlt size={22} />,
  "/invoices": () => <MdOutlineDescription size={22} />,
  "/tracker": () => <MdOutlineTimer size={22} />,
  "/vault": () => <MdOutlineInventory2 size={22} />,
  "/settings": () => <MdOutlineSettings size={22} />,
  "/apps": () => <MdOutlineApps size={22} />,
  "/inbox": () => <MdOutlineInbox size={22} />,
};

const defaultItems: MenuItem[] = [
  { path: "/", name: "Overview" },
  { path: "/inbox", name: "Inbox" },
  { path: "/transactions", name: "Transactions" },
  { path: "/invoices", name: "Invoices" },
  { path: "/tracker", name: "Tracker" },
  { path: "/vault", name: "Vault" },
  { path: "/apps", name: "Apps" },
  { path: "/settings", name: "Settings" },
];

interface ItemProps {
  item: MenuItem;
  isActive: boolean;
  isCustomizing: boolean;
  onRemove: (path: string) => void;
  disableRemove: boolean;
  onDragEnd: () => void;
  onSelect?: () => void;
}

const Item = ({
  item,
  isActive,
  isCustomizing,
  onRemove,
  disableRemove,
  onDragEnd,
  onSelect,
}: ItemProps) => {
  const y = useMotionValue(0);
  const Icon = icons[item.path];

  return (
    <TooltipProvider delayDuration={70}>
      <Link
        prefetch
        href={item.path}
        onClick={(evt) => {
          if (isCustomizing) {
            evt.preventDefault();
          }

          onSelect?.();
        }}
        onMouseDown={(evt) => {
          if (isCustomizing) {
            evt.preventDefault();
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger className="w-full">
            <Reorder.Item
              onDragEnd={onDragEnd}
              key={item.path}
              value={item}
              id={item.path}
              style={{ y }}
              layoutRoot
              className={cn(
                "relative border border-transparent md:w-[45px] h-[45px] flex items-center md:justify-center",
                "hover:bg-accent hover:border-[#DCDAD2] hover:dark:border-[#2C2C2C]",
                isActive &&
                  "bg-[#F2F1EF] dark:bg-secondary border-[#DCDAD2] dark:border-[#2C2C2C]",
                isCustomizing &&
                  "bg-background border-[#DCDAD2] dark:border-[#2C2C2C]",
              )}
            >
              <motion.div
                className="relative"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!disableRemove && isCustomizing && (
                  <div
                    onClick={() => onRemove(item.path)}
                    className="absolute -left-4 -top-4 w-4 h-4 p-0 rounded-full bg-border hover:bg-border hover:scale-150 z-10 transition-all cursor-pointer"
                  >
                    <MdRemove className="w-3 h-3" />
                  </div>
                )}

                <div
                  className={cn(
                    "flex space-x-3 p-0 items-center pl-2 md:pl-0",
                    isCustomizing &&
                      "animate-[jiggle_0.3s_ease-in-out_infinite] transform-gpu pointer-events-none",
                  )}
                >
                  <Icon />
                  <span className="flex md:hidden">{item.name}</span>
                </div>
              </motion.div>
            </Reorder.Item>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="px-3 py-1.5 text-xs hidden md:flex"
            sideOffset={10}
          >
            {item.name}
          </TooltipContent>
        </Tooltip>
      </Link>
    </TooltipProvider>
  );
};

const listVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

type Props = {
  initialItems?: MenuItem[];
  onSelect?: () => void;
};

export function MainMenu({ initialItems, onSelect }: Props) {
  const [items, setItems] = useState<MenuItem[]>(initialItems ?? defaultItems);
  const authenticate = useMutation(api.users.authenticate);
  const { isCustomizing, setCustomizing } = useMenuStore();
  const pathname = usePathname();
  const part = pathname?.split("/")[1];

  const updateMenuAndCookie = async (newItems: typeof items) => {
    try {
      // 1. 先通过 Convex 进行认证
      await authenticate({
        value: newItems,
        metadata: {
          name: "update-menu",
        },
      });

      // 2. 认证通过后，调用 server action 设置 cookie
      await updateMenuAction(newItems);

      // 3. 更新本地状态
      setItems(newItems);
    } catch (error) {
      console.error("Failed to update menu:", error);
    }
  };

  const hiddenItems = defaultItems.filter(
    (item) => !items.some((i) => i.path === item.path),
  );

  const onReorder = (newItems: MenuItem[]) => {
    setItems(newItems);
  };

  const onDragEnd = () => {
    updateMenuAndCookie(items);
  };

  const onRemove = (path: string) => {
    const newItems = items.filter((item) => item.path !== path);
    updateMenuAndCookie(newItems);
  };

  const onAdd = (item: MenuItem) => {
    const updatedItems = [...items, item];
    updateMenuAndCookie(updatedItems);
  };

  const bind = useLongPress(
    () => {
      setCustomizing(true);
    },
    {
      cancelOnMovement: 0,
    },
  );

  const ref = useClickAway<HTMLDivElement>(() => {
    setCustomizing(false);
  });

  return (
    <div className="mt-6" {...bind()} ref={ref}>
      <nav>
        <Reorder.Group
          axis="y"
          onReorder={onReorder}
          values={items}
          className="flex flex-col gap-1.5"
        >
          {items.map((item) => {
            const isActive =
              (pathname === "/" && item.path === "/") ||
              (pathname !== "/" && item.path.startsWith(`/${part}`));

            return (
              <Item
                key={item.path}
                item={item}
                isActive={isActive}
                isCustomizing={isCustomizing}
                onRemove={onRemove}
                disableRemove={items.length === 1}
                onDragEnd={onDragEnd}
                onSelect={onSelect}
              />
            );
          })}
        </Reorder.Group>
      </nav>

      {hiddenItems.length > 0 && isCustomizing && (
        <nav className="border-t-[1px] mt-6 pt-6">
          <motion.ul
            variants={listVariant}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-1.5"
          >
            {hiddenItems.map((item) => {
              const Icon = icons[item.path];

              return (
                <motion.li
                  variants={itemVariant}
                  key={item.path}
                  className={cn(
                    "border border-transparent w-[45px] h-[45px] flex items-center md:justify-center",
                    "hover:bg-secondary hover:border-[#DCDAD2] hover:dark:border-[#2C2C2C]",
                    "bg-background border-[#DCDAD2] dark:border-[#2C2C2C]",
                  )}
                >
                  <div className="relative">
                    <Button
                      onClick={() => onAdd(item)}
                      variant="ghost"
                      size="icon"
                      className="absolute -left-4 -top-4 w-4 h-4 p-0 rounded-full bg-border hover:bg-border hover:scale-150 z-10 transition-all"
                    >
                      <MdAdd className="w-3 h-3" />
                    </Button>

                    <Icon />
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>
      )}
    </div>
  );
}
