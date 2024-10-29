"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import image1 from '@/public/branding/1.png';
import image2 from '@/public/branding/2.png';
import image3 from '@/public/branding/3.png';
import image4 from '@/public/branding/4.png';
import image5 from '@/public/branding/5.png';
import image7 from '@/public/branding/7.png';
import image8 from '@/public/branding/8.png';
import image9 from '@/public/branding/9.png';
import image10 from '@/public/branding/10.png';
import image11 from '@/public/branding/11.png';

const assets = [
  <Image
    key="1"
    src={image1}
    width={600}
    alt="keyboard"
  />,
  <Image
    key="2"
    src={image2}
    width={600}
    alt="founders"
  />,
  <Image
    key="3"
    src={image3}
    width={600}
    alt="screens"
  />,
  <Image
    key="4"
    src={image4}
    width={600}
    alt="screens"
  />,
  <Image
    key="5"
    src={image5}
    width={600}
    alt="screens"
  />,
  <Image
    key="7"
    src={image7}
    width={600}
    alt="screens"
  />,
  <Image
    key="8"
    src={image8}
    width={600}
    alt="screens"
  />,
  <Image
    key="9"
    src={image9}
    width={600}
    alt="screens"
  />,
  <Image
    key="10"
    src={image10}
    width={600}
    alt="screens"
  />,
  <Image
    key="11"
    src={image11}
    width={600}
    alt="screens"
  />,
];

const DOWNLOADS = {
  all: "/downloads/all.zip",
  videos: "/downloads/videos.zip",
  founders: "/downloads/founders.zip",
  screens: "/downloads/screens.zip"
} as const;

const repeated = [...assets, ...assets, ...assets, ...assets, ...assets];

export function BrandCanvas() {
  const [value, setValue] = useState(DOWNLOADS.all);
  const ref = useRef();
  const { events } = useDraggable(ref);

  return (
    <div className="sm:h-screen sm:w-screen overflow-hidden">
      <div
        className="fixed bg-background z-10 top-0 left-0 right-0 overflow-scroll scrollbar-hide cursor-grabbing"
        {...events}
        ref={ref}
      >
        <div className="w-[4900px] flex h-screen">
          <div className="grid grid-cols-8 gap-4 items-center">
            {repeated.map((asset, index) => (
              <div className="h-auto max-w-full" key={index.toString()}>
                {asset}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 z-20 w-full flex justify-center items-center">
        <div className="h-[48px] w-[240px] rounded-full border border-border backdrop-filter backdrop-blur-xl bg-[#121212] bg-opacity-70 text-center flex items-center p-1 pl-2 justify-between space-x-4">
          <Select onValueChange={setValue} value={value}>
            <SelectTrigger className="w-[180px] border-0 space-x-2">
              <SelectValue placeholder="All" className="border-0" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={DOWNLOADS.all}>
                  All
                </SelectItem>
                <SelectItem value={DOWNLOADS.videos}>
                  Videos
                </SelectItem>
                <SelectItem value={DOWNLOADS.founders}>
                  Founders
                </SelectItem>
                <SelectItem value={DOWNLOADS.screens}>
                  Screens
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button className="rounded-full">
            <a href={value} download title="Download">
              Download
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
