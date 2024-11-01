"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdExpandLess, MdExpandMore, MdIosShare } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { FaXTwitter } from "react-icons/fa6";
import { CopyInput } from "@/components/CopyInput";

const baseUrl = "https://broker.lszmwh.cn";

interface PopupOptions {
  url: string;
  title: string;
  w: number;
  h: number;
}

interface Post {
  slug: string;
  metadata: {
    title: string;
  };
}

interface UpdatesToolbarProps {
  posts: Post[];
}

const popupCenter = ({ url, title, w, h }: PopupOptions) => {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `,
  );

  return newWindow;
};

export function UpdatesToolbar({ posts }: UpdatesToolbarProps) {
  const pathname = usePathname();
  const currentIndex = posts.findIndex((a) => pathname.endsWith(a.slug)) ?? 0;

  const currentPost = posts[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevPost = posts[currentIndex - 1];
      const element = document.getElementById(`article-${prevPost?.slug}`);

      if (element) {
        const headerOffset = 80;
        const targetPosition = element.offsetTop - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // 更新 URL
        const newUrl = `/GetStarted/updates/${prevPost.slug}`;
        window.history.pushState({}, "", newUrl);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex !== posts.length - 1) {
      const nextPost = posts[currentIndex + 1];
      const element = document.getElementById(`article-${nextPost?.slug}`);

      if (element) {
        const headerOffset = 80;
        const targetPosition = element.offsetTop - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // 更新 URL
        const newUrl = `/GetStarted/updates/${nextPost.slug}`;
        window.history.pushState({}, "", newUrl);
      }
    }
  };

  useHotkeys("arrowRight", () => handleNext(), [handleNext]);
  useHotkeys("arrowLeft", () => handlePrev(), [handlePrev]);

  const handleOnShare = () => {
    const popup = popupCenter({
      url: `https://twitter.com/intent/tweet?text=${currentPost.metadata.title} ${baseUrl}/GetStarted/updates/${currentPost.slug}`,
      title: currentPost.metadata.title,
      w: 800,
      h: 400,
    });

    popup?.focus();
  };

  return (
    <Dialog modal={false}>
      <div className="fixed right-6 bottom-0 top-0 flex-col items-center justify-center hidden md:flex">
        <TooltipProvider delayDuration={20}>
          <div className="flex flex-col items-center backdrop-filter backdrop-blur-lg bg-[#1A1A1A]/80 p-2 border border-[#2C2C2C] space-y-4 rounded-full">
            <Tooltip>
              <TooltipTrigger>
                <DialogTrigger asChild>
                  <MdIosShare size={18} className="text-[#606060] -mt-[1px]" />
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent
                className="py-1 px-3 rounded-sm"
                sideOffset={25}
                side="right"
              >
                <span className="text-xs">Share</span>
              </TooltipContent>
            </Tooltip>

            <div className="flex flex-col items-center border-t-[1px] border-border space-y-2 pt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    role="button"
                    tabIndex={0}
                    className={cn(
                      "cursor-pointer",
                      currentIndex === 0 && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={currentIndex === 0 ? undefined : handlePrev}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (currentIndex !== 0) handlePrev();
                      }
                    }}
                  >
                    <MdExpandLess className="h-6 w-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-3 rounded-sm"
                  sideOffset={25}
                  side="right"
                >
                  <span className="text-xs">Previous post</span>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    role="button"
                    tabIndex={0}
                    className={cn(
                      "cursor-pointer",
                      currentIndex === posts.length - 1 &&
                        "opacity-50 cursor-not-allowed",
                    )}
                    onClick={
                      currentIndex === posts.length - 1 ? undefined : handleNext
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (currentIndex !== posts.length - 1) handleNext();
                      }
                    }}
                  >
                    <MdExpandMore className="h-6 w-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-3 rounded-sm"
                  sideOffset={25}
                  side="right"
                >
                  <span className="text-xs">Next post</span>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>

      <DialogContent className="sm:max-w-[700px]">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <CopyInput value={`${baseUrl}${pathname}`} />
            <Button
              className="w-full flex items-center space-x-2 h-10"
              onClick={handleOnShare}
            >
              <span>Share on</span>
              <FaXTwitter />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
