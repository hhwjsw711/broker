"use client";

import { AssistantButton } from "@/components/assistant/button";
import { UserMenu } from "@/components/UserMenu";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";

export function Header() {
  return (
    <header className="-ml-4 -mr-4 md:m-0 z-10 px-4 md:px-0 md:border-b-[1px] flex justify-between pt-4 pb-2 md:pb-4 items-center todesktop:sticky todesktop:top-0 todesktop:bg-background todesktop:border-none sticky md:static top-0 backdrop-filter backdrop-blur-xl md:backdrop-filter md:backdrop-blur-none bg-background/70 dark:bg-background/70">
      <AssistantButton />

      <div className="flex space-x-2 ml-auto">
        <FeedbackForm />

        <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}
