import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { RecoilContextProvider } from "@/store/recoilContextProvider";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "B-POS",
  description: "Created By BoomTH, Kurio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.className} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RecoilContextProvider>
            {children}
          </RecoilContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
