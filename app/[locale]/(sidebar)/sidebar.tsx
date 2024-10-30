import { Cookies } from "@/utils/constants";
import { cookies } from "next/headers";
import Link from "next/link";
import { MainMenu } from "@/components/MainMenu";
import { ConvexLogo } from "../(splash)/GetStarted/ConvexLogo";

// 导入 MenuPath 类型
type MenuPath = 
  | "/"
  | "/transactions"
  | "/invoices"
  | "/tracker"
  | "/vault"
  | "/settings"
  | "/apps"
  | "/inbox";

// 修改 MenuItem 接口，使用 MenuPath 类型
interface MenuItem {
  path: MenuPath;  // 改为 MenuPath 类型
  name: string;
}

export function Sidebar() {
  const cookieStore = cookies();
  const menuCookie = cookieStore.get(Cookies.MenuConfig);

  // 添加类型验证
  const parsedItems = menuCookie 
    ? JSON.parse(menuCookie.value) 
    : undefined;

  // 验证并转换类型
  const initialItems: MenuItem[] | undefined = parsedItems?.map((item: any) => {
    if (typeof item.path !== 'string' || !isValidMenuPath(item.path)) {
      console.warn(`Invalid menu path: ${item.path}`);
      return null;
    }
    return {
      path: item.path as MenuPath,
      name: item.name
    };
  })?.filter((item: MenuItem | null): item is MenuItem => item !== null);

  return (
    <aside className="h-screen flex-shrink-0 flex-col justify-between fixed top-0 ml-4 pb-4 items-center hidden md:flex">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-7">
          <Link href="/">
            <ConvexLogo />
          </Link>
        </div>
        <MainMenu initialItems={initialItems} />
      </div>
    </aside>
  );
}

// 辅助函数：验证是否为有效的 MenuPath
function isValidMenuPath(path: string): path is MenuPath {
  const validPaths: MenuPath[] = [
    "/",
    "/transactions",
    "/invoices",
    "/tracker",
    "/vault",
    "/settings",
    "/apps",
    "/inbox"
  ];
  return validPaths.includes(path as MenuPath);
}