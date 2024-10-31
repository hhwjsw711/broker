import { Cookies } from "@/utils/constants";
import { cookies } from "next/headers";
import Link from "next/link";
import { MainMenu } from "@/components/MainMenu";
import { ConvexLogo } from "../(splash)/GetStarted/ConvexLogo";

// 导入 MenuPath 类型
interface MenuItem {
  path: string;
  name: string;
}

export function Sidebar() {
  const cookieStore = cookies();
  const menuCookie = cookieStore.get(Cookies.MenuConfig);

  // 使用 ?? undefined 将 null 转换为 undefined
  const initialItems: MenuItem[] | undefined = menuCookie
    ? (JSON.parse(menuCookie.value) as MenuItem[])
    : undefined; // 改为 undefined

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
