import type { Metadata } from "next";
import "./globals.css";
import "./prose-mirror.css";
import { ThemeProvider } from "@/lib/context/ThemeProviders";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";
import QueryClientProviders from "@/lib/context/QueryClientProviders";

export const metadata: Metadata = {
  title: "Job seeking",
  description: "Website for candidate looking for work",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const message = await getMessages();
  return (
    <>
      <html suppressHydrationWarning>
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
                <div className="w-screen">{children}</div>
              </QueryClientProviders>
              <Toaster />
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
