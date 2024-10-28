import { ReactNode } from "react";
import { Header } from "./GetStarted/header";
import { Metadata } from "next";
import { FooterCTA } from "./GetStarted/footer-cta";
import { Footer } from "./GetStarted/footer";

export const metadata: Metadata = {
  title: {
    default: "Broker | Trust in Every Trade",
    template: "%s | Broker",
  },
  description:
    "Broker is a platform for Data Trading, IP Protection, and Future Security.",
};

export default function SplashPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex grow flex-col">{children}</main>
      <FooterCTA />
      <Footer />
    </div>
  );
}
