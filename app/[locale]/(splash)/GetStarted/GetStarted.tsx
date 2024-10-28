import { ConvexLogo } from "./ConvexLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Screens } from "./screens";
import { SectionFour } from "./section-four";
import { SectionSix } from "./section-six";
import { SectionSeven } from "./section-seven";

export const GetStarted = () => {
  return (
    <div className="flex grow flex-col">
      <div className="container mb-20 flex grow flex-col justify-center">
        <h1 className="mb-8 mt-32 flex flex-col items-center gap-8 text-center text-6xl font-extrabold leading-none tracking-tight">
          Trust in Every Trade
          <ConvexLogo width={377} height={44} />
        </h1>
        <div className="mb-8 text-center text-lg text-muted-foreground">
          Broker is a platform for Data Trading, IP Protection, and Future
          Security.
        </div>
        <div className="mb-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/overview">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="https://docs.convex.dev/home">Talk to us</Link>
          </Button>
        </div>
        <div className="mb-8 flex justify-center gap-4">
          <p className="text-xs text-[#707070] font-mono">
            Used by over{" "}
            <Link href="/open-startup" prefetch>
              <span className="underline">5,200+</span>
            </Link>{" "}
            creators.
          </p>
        </div>
        <Screens />
        <SectionFour />
        <SectionSix />
        <SectionSeven />
      </div>
    </div>
  );
};
