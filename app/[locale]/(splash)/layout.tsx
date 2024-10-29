import { ReactNode } from "react";
import { Header } from "./GetStarted/header";
import { Metadata } from "next";
import { Footer } from "./GetStarted/footer";
import { FooterCTA } from "./GetStarted/footer-cta";

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
      <main className="container mx-auto px-4 flex grow flex-col pt-[74px]">{children}</main>
      <FooterCTA />
      <Footer />
    </div>
  );
}
