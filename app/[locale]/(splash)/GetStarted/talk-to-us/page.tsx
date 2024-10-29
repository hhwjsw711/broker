import { CalEmbed } from "@/components/CalEmbed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talk to us",
  description: "Schedule a meeting with us",
};

export default function Page() {
  return (
    <div className="mt-24">
      <CalEmbed calLink="hhwjsw711/30min" />
    </div>
  );
}
