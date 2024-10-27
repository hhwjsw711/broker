import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { I18nProviderClient } from "@/locales/client";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Broker | Trust in Every Trade",
  description: "Broker is a platform for Data Trading, IP Protection, and Future Security.",
  icons: {
    icon: "/appico.svg",
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      {/* `suppressHydrationWarning` only affects the html tag,
      and is needed by `ThemeProvider` which sets the theme
      class attribute on it */}
      <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "whitespace-pre-line overscroll-none",
        )}
      >
          <ThemeProvider attribute="class">
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
