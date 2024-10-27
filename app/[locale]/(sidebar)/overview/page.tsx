import { Chat } from "./Chat/Chat";
import { ChatIntro } from "./Chat/ChatIntro";
import { UserMenu } from "@/components/UserMenu";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview | Broker",
};

export default async function OverviewPage() {
  const viewer = await fetchQuery(
    api.users.viewer,
    {},
    { token: convexAuthNextjsToken() },
  );
  return (
    <main className="flex max-h-screen grow flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b p-4">
        <ChatIntro />
        <UserMenu>{viewer.name}</UserMenu>
      </div>
      <Chat viewer={viewer._id} />
    </main>
  );
}
