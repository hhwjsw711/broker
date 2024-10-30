"use server";

import { Cookies } from "@/utils/constants";
import { addYears } from "date-fns";
import { cookies } from "next/headers";

export async function updateMenuAction(
  items: Array<{ path: string; name: string }>,
) {
  cookies().set({
    name: Cookies.MenuConfig,
    value: JSON.stringify(items),
    expires: addYears(new Date(), 1),
  });

  return items;
}
