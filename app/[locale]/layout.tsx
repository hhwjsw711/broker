import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { I18nProviderClient } from "@/locales/client";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { baseUrl } from "@/app/sitemap";

export const preferredRegion = ["sin1", "sfo1", "iad1"];

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Midday | Run your business smarter",
    template: "%s | Midday",
  },
  description:
    "Midday provides you with greater insight into your business and automates the boring tasks, allowing you to focus on what you love to do instead.",
  openGraph: {
    title: "Midday | Run your business smarter",
    description:
      "Midday provides you with greater insight into your business and automates the boring tasks, allowing you to focus on what you love to do instead.",
    url: baseUrl,
    siteName:
      "Midday provides you with greater insight into your business and automates the boring tasks, allowing you to focus on what you love to do instead.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cdn.midday.ai/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://cdn.midday.ai/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
  },
  twitter: {
    title: "Midday | Run your business smarter",
    description:
      "Midday provides you with greater insight into your business and automates the boring tasks, allowing you to focus on what you love to do instead.",
    images: [
      {
        url: "https://cdn.midday.ai/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://cdn.midday.ai/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
