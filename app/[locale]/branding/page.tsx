import { Header } from "../(splash)/GetStarted/header";
import { BrandCanvas } from "./brand-canvas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branding",
  description: "Download branding assets, logo, screenshots and more.",
};

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <BrandCanvas />;
    </div>
  );
}
