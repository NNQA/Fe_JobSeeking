import type { Metadata } from "next";
import "./globals.css";
import "./prose-mirror.css";
import { ThemeProvider } from "@/lib/context/ThemeProviders";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";
import QueryClientProviders from "@/lib/context/QueryClientProviders";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
export const metadata: Metadata = {
  title: "Job seeking",
  description: "Website for candidate looking for work",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const message = await getMessages();
  return (
    <>
      <html suppressHydrationWarning lang={locale}>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={message}>
              <QueryClientProviders>
                <ScrollArea className="w-full h-screen">{children}</ScrollArea>
              </QueryClientProviders>
              <Toaster />
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
