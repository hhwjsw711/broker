"use client";

import { useAssistantStore } from "@/store/assistant";
import { Button } from "@/components/ui/button";

export function AssistantButton() {
  const { setOpen } = useAssistantStore();

  return (
    <Button
      variant="outline"
      className="relative min-w-[250px] w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 border-0 h-9 hover:bg-accent/50 font-normal no-drag flex items-center"
      onClick={() => setOpen()}
    >
      <span className="ml-4 md:ml-0 truncate">Ask Midday a question...</span>
      <kbd className="pointer-events-none absolute right-1.5 top-[50%] -translate-y-[50%] hidden h-5 select-none items-center gap-1 border bg-accent px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}